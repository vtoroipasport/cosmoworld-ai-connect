
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
  prompt?: string;
  context?: string;
}

const VoiceAssistant = ({ 
  onCommand, 
  prompt = "Скажите команду", 
  context = "" 
}: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [visualizerData, setVisualizerData] = useState<number[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const { toast } = useToast();

  // Audio visualizer effect
  useEffect(() => {
    if (isListening && analyserRef.current) {
      const updateVisualizer = () => {
        const bufferLength = analyserRef.current!.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current!.getByteFrequencyData(dataArray);
        
        // Get 8 frequency bars for visualization
        const bars = [];
        const step = Math.floor(bufferLength / 8);
        for (let i = 0; i < 8; i++) {
          bars.push(dataArray[i * step] / 255);
        }
        setVisualizerData(bars);
        
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } else {
      setVisualizerData([]);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isListening]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        }
      });
      
      // Setup audio analyser for visualizer
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);
      analyserRef.current = analyser;
      
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      });
      
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
        
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
      };
      
      mediaRecorderRef.current.start();
      setIsListening(true);
      console.log('Cosmo AI: Начинаю запись...');
      
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      toast({
        title: "Ошибка микрофона",
        description: "Не удалось получить доступ к микрофону",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Audio = btoa(binary);

      const response = await fetch(`https://nzrrycacclufrrdvazut.supabase.co/functions/v1/cosmo-voice-assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          audio: base64Audio,
          action: 'chat'
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const result = await response.json();
      
      setTranscript(result.text || 'Не удалось распознать речь');
      setResponse(result.text || '');
      
      if (result.audio) {
        await playAudioResponse(result.audio);
      }
      
      if (onCommand && result.text) {
        onCommand(result.text);
      }
      
    } catch (error) {
      console.error('Ошибка обработки аудио:', error);
      toast({
        title: "Ошибка обработки",
        description: "Не удалось обработать голосовую команду",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudioResponse = async (base64Audio: string) => {
    try {
      setIsSpeaking(true);
      
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('Ошибка воспроизведения аудио:', error);
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setIsSpeaking(false);
  };

  const handleButtonClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="relative">
      {/* Neural Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-2xl animate-pulse" />
      
      <Card className="relative glass-morphism border-primary/30 overflow-hidden">
        {/* Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 animate-pulse rounded-3xl" />
        
        <div className="relative p-8 text-center">
          {/* Status Indicator Ring */}
          <div className="absolute top-4 right-4 flex space-x-1">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isProcessing ? 'bg-yellow-400' : 
              isSpeaking ? 'bg-green-400' : 
              isListening ? 'bg-red-400' : 'bg-gray-400'
            }`} />
            <div className={`w-2 h-2 rounded-full animate-pulse delay-100 ${
              isProcessing ? 'bg-yellow-400' : 
              isSpeaking ? 'bg-green-400' : 
              isListening ? 'bg-red-400' : 'bg-gray-400'
            }`} />
            <div className={`w-2 h-2 rounded-full animate-pulse delay-200 ${
              isProcessing ? 'bg-yellow-400' : 
              isSpeaking ? 'bg-green-400' : 
              isListening ? 'bg-red-400' : 'bg-gray-400'
            }`} />
          </div>

          {/* Main Control Button */}
          <div className="mb-6 relative">
            {/* Pulse Rings */}
            {(isListening || isSpeaking) && (
              <>
                <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full border-2 border-primary/30 animate-ping" />
                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-accent/20 animate-ping animation-delay-300" />
              </>
            )}
            
            <Button
              onClick={handleButtonClick}
              disabled={isProcessing}
              className={`relative w-24 h-24 rounded-full transition-all duration-500 transform hover:scale-105 ${
                isProcessing
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-yellow-500/50'
                  : isSpeaking
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg shadow-green-500/50'
                  : isListening
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50'
                  : 'bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/50 hover:shadow-primary/70'
              }`}
            >
              {isProcessing ? (
                <Brain className="w-10 h-10 text-white animate-pulse" />
              ) : isSpeaking ? (
                <Volume2 className="w-10 h-10 text-white animate-bounce" />
              ) : isListening ? (
                <Mic className="w-10 h-10 text-white animate-pulse" />
              ) : (
                <MicOff className="w-10 h-10 text-white" />
              )}
              
              {/* Inner Glow */}
              <div className="absolute inset-2 rounded-full bg-white/10 animate-pulse" />
            </Button>
          </div>

          {/* Audio Visualizer */}
          {isListening && visualizerData.length > 0 && (
            <div className="flex justify-center items-end space-x-1 mb-4 h-12">
              {visualizerData.map((height, index) => (
                <div
                  key={index}
                  className="w-2 bg-gradient-to-t from-primary to-accent rounded-full transition-all duration-100"
                  style={{ height: `${Math.max(height * 40, 4)}px` }}
                />
              ))}
            </div>
          )}

          {/* AI Brand */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <h3 className="text-white text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Cosmo AI
            </h3>
            <div className="w-8 h-8 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white animate-pulse" />
            </div>
          </div>
          
          {/* Status Text */}
          <p className={`text-lg font-semibold mb-4 transition-all duration-300 ${
            isProcessing ? 'text-yellow-400 animate-pulse' :
            isSpeaking ? 'text-green-400 animate-pulse' :
            isListening ? 'text-red-400 animate-pulse' :
            'text-purple-300'
          }`}>
            {isProcessing
              ? '🧠 Анализирую запрос...'
              : isSpeaking
              ? '🔊 Отвечаю вам...'
              : isListening
              ? '🎤 Слушаю внимательно...'
              : prompt}
          </p>
          
          {/* Transcript Display */}
          {transcript && (
            <div className="mb-4 p-4 neomorphism-inset rounded-2xl animate-slide-up-bounce">
              <p className="text-green-400 text-sm font-bold mb-2 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Вы сказали:
              </p>
              <p className="text-white text-base font-medium">"{transcript}"</p>
            </div>
          )}
          
          {/* AI Response Display */}
          {response && response !== transcript && (
            <div className="mb-4 p-4 neomorphism-inset rounded-2xl animate-scale-in-bounce">
              <p className="text-blue-400 text-sm font-bold mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Cosmo AI:
              </p>
              <p className="text-white text-base font-medium">"{response}"</p>
            </div>
          )}
          
          {/* Context Info */}
          {context && (
            <p className="text-gray-400 text-sm mt-4 opacity-75">{context}</p>
          )}

          {/* Recommendation System Preview */}
          <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary font-bold text-sm">ИИ Рекомендации</span>
            </div>
            <div className="flex gap-2">
              <div className="px-3 py-1 bg-primary/20 rounded-full text-xs text-primary animate-pulse">
                Еда поблизости
              </div>
              <div className="px-3 py-1 bg-accent/20 rounded-full text-xs text-accent animate-pulse delay-100">
                Быстрые платежи
              </div>
              <div className="px-3 py-1 bg-primary/20 rounded-full text-xs text-primary animate-pulse delay-200">
                Вызов такси
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-primary/30 rounded-full animate-float`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + (i % 3) * 30}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default VoiceAssistant;
