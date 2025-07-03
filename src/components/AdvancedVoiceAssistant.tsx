
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Zap, Eye, Waves, Radio } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdvancedVoiceAssistantProps {
  onCommand?: (command: string) => void;
  prompt?: string;
  context?: string;
}

const AdvancedVoiceAssistant = ({ 
  onCommand, 
  prompt = "Скажите команду", 
  context = "" 
}: AdvancedVoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [visualizerData, setVisualizerData] = useState<number[]>([]);
  const [aiPersonality, setAiPersonality] = useState('🤖');
  const [confidenceLevel, setConfidenceLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>();
  const { toast } = useToast();

  // AI Personality Animation
  useEffect(() => {
    const personalities = ['🤖', '🧠', '⚡', '🌟', '💫', '🔮'];
    let index = 0;
    
    const interval = setInterval(() => {
      if (isProcessing) {
        setAiPersonality(personalities[index % personalities.length]);
        index++;
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isProcessing]);

  // Advanced Audio Visualizer
  useEffect(() => {
    if (isListening && analyserRef.current) {
      const updateVisualizer = () => {
        const bufferLength = analyserRef.current!.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current!.getByteFrequencyData(dataArray);
        
        // Create more sophisticated visualization with 16 bars
        const bars = [];
        const step = Math.floor(bufferLength / 16);
        for (let i = 0; i < 16; i++) {
          const value = dataArray[i * step] / 255;
          bars.push(value);
        }
        setVisualizerData(bars);
        
        // Calculate confidence level based on audio input
        const avgVolume = bars.reduce((a, b) => a + b, 0) / bars.length;
        setConfidenceLevel(Math.min(avgVolume * 100, 100));
        
        animationFrameRef.current = requestAnimationFrame(updateVisualizer);
      };
      updateVisualizer();
    } else {
      setVisualizerData([]);
      setConfidenceLevel(0);
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
          autoGainControl: true,
        }
      });
      
      // Setup advanced audio analyser
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
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
      {/* Quantum Neural Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-3xl blur-3xl animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl animate-pulse animation-delay-500" />
      
      <Card className="relative glass-morphism border-primary/30 overflow-hidden">
        {/* Dynamic Animated Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-30 animate-gradient-shift rounded-3xl" />
        <div className="absolute inset-1 bg-background/80 rounded-3xl" />
        
        <div className="relative p-8 text-center">
          {/* Advanced Status Constellation */}
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full animate-pulse ${
                    isProcessing ? 'bg-yellow-400' : 
                    isSpeaking ? 'bg-green-400' : 
                    isListening ? 'bg-red-400' : 'bg-gray-400'
                  }`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="text-xs font-bold text-muted-foreground">
              {isProcessing ? 'AI' : isSpeaking ? 'SPEAK' : isListening ? 'LISTEN' : 'READY'}
            </div>
          </div>

          {/* AI Personality Display */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="text-2xl animate-bounce">{aiPersonality}</div>
            <div className="text-xs font-bold text-primary">
              COSMO v2.0
            </div>
          </div>

          {/* Revolutionary Control Button */}
          <div className="mb-8 relative">
            {/* Multiple Pulse Rings */}
            {(isListening || isSpeaking || isProcessing) && (
              <>
                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-primary/20 animate-ping" />
                <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full border border-accent/15 animate-ping animation-delay-300" />
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border border-primary/10 animate-ping animation-delay-600" />
              </>
            )}
            
            <Button
              onClick={handleButtonClick}
              disabled={isProcessing}
              className={`relative w-32 h-32 rounded-full transition-all duration-700 transform hover:scale-110 ${
                isProcessing
                  ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl shadow-yellow-500/50'
                  : isSpeaking
                  ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 shadow-2xl shadow-green-500/50'
                  : isListening
                  ? 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 shadow-2xl shadow-red-500/50'
                  : 'bg-gradient-to-br from-primary via-accent to-primary shadow-2xl shadow-primary/50 hover:shadow-primary/70'
              }`}
            >
              {/* Inner Glow Layers */}
              <div className="absolute inset-4 rounded-full bg-white/10 animate-pulse" />
              <div className="absolute inset-6 rounded-full bg-white/5 animate-pulse animation-delay-300" />
              
              {/* Main Icon */}
              {isProcessing ? (
                <Brain className="w-12 h-12 text-white animate-spin" />
              ) : isSpeaking ? (
                <Volume2 className="w-12 h-12 text-white animate-bounce" />
              ) : isListening ? (
                <Mic className="w-12 h-12 text-white animate-pulse" />
              ) : (
                <Radio className="w-12 h-12 text-white" />
              )}
            </Button>
          </div>

          {/* Advanced Audio Visualizer */}
          {isListening && visualizerData.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-center items-end space-x-1 mb-4 h-16">
                {visualizerData.map((height, index) => (
                  <div
                    key={index}
                    className="w-1.5 bg-gradient-to-t from-primary via-accent to-purple-500 rounded-full transition-all duration-150 shadow-lg"
                    style={{ 
                      height: `${Math.max(height * 60, 4)}px`,
                      filter: `hue-rotate(${index * 22.5}deg)`,
                      boxShadow: `0 0 ${height * 20}px rgba(124, 58, 237, ${height})`
                    }}
                  />
                ))}
              </div>
              
              {/* Confidence Meter */}
              <div className="w-full max-w-xs mx-auto mb-4">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Confidence</span>
                  <span>{Math.round(confidenceLevel)}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${confidenceLevel}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Neural AI Branding */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center relative">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="text-white text-3xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Cosmo AI
              </h3>
              <p className="text-xs text-muted-foreground font-medium">Neural Assistant v2.0</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center relative">
              <Eye className="w-6 h-6 text-white animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse animation-delay-300" />
            </div>
          </div>
          
          {/* Dynamic Status Text */}
          <p className={`text-lg font-bold mb-6 transition-all duration-500 ${
            isProcessing ? 'text-yellow-400 animate-pulse' :
            isSpeaking ? 'text-green-400 animate-pulse' :
            isListening ? 'text-red-400 animate-pulse' :
            'text-purple-300'
          }`}>
            {isProcessing
              ? `🧠 Анализирую... ${aiPersonality}`
              : isSpeaking
              ? '🔊 Отвечаю вам...'
              : isListening
              ? `🎤 Слушаю внимательно... ${Math.round(confidenceLevel)}%`
              : prompt}
          </p>
          
          {/* Enhanced Response Display */}
          {transcript && (
            <div className="mb-4 p-4 neomorphism-inset rounded-3xl animate-slide-up-bounce">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-4 h-4 text-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-bold">Распознано:</span>
              </div>
              <p className="text-white text-base font-medium bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                "{transcript}"
              </p>
            </div>
          )}
          
          {/* AI Response with Enhanced Animation */}
          {response && response !== transcript && (
            <div className="mb-6 p-4 neomorphism-inset rounded-3xl animate-scale-in-bounce">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                <span className="text-blue-400 text-sm font-bold">Cosmo AI:</span>
              </div>
              <p className="text-white text-base font-medium bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                "{response}"
              </p>
            </div>
          )}
          
          {/* Context Info */}
          {context && (
            <p className="text-gray-400 text-sm mt-4 opacity-75">{context}</p>
          )}

          {/* Next-Gen AI Capabilities Preview */}
          <div className="mt-8 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary font-bold text-sm">Нейросеть v2.0</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="px-3 py-2 bg-blue-500/20 rounded-2xl text-xs text-blue-400 animate-pulse text-center">
                <div className="font-bold">GPT-4</div>
                <div className="opacity-75">Reasoning</div>
              </div>
              <div className="px-3 py-2 bg-green-500/20 rounded-2xl text-xs text-green-400 animate-pulse animation-delay-200 text-center">
                <div className="font-bold">Voice</div>
                <div className="opacity-75">Synthesis</div>
              </div>
              <div className="px-3 py-2 bg-purple-500/20 rounded-2xl text-xs text-purple-400 animate-pulse animation-delay-400 text-center">
                <div className="font-bold">Vision</div>
                <div className="opacity-75">Analysis</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedVoiceAssistant;
