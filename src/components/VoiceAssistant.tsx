
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

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
        
        // Останавливаем все треки
        stream.getTracks().forEach(track => track.stop());
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
      // Конвертируем аудио в base64
      const arrayBuffer = await audioBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      let binary = '';
      for (let i = 0; i < uint8Array.length; i++) {
        binary += String.fromCharCode(uint8Array[i]);
      }
      const base64Audio = btoa(binary);

      // Отправляем на сервер для обработки
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
      
      // Воспроизводим аудио ответ
      if (result.audio) {
        await playAudioResponse(result.audio);
      }
      
      // Вызываем callback
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
      
      // Декодируем base64 в аудио
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
    // Останавливаем все аудио элементы
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
    <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
      <div className="p-4 text-center">
        <div className="mb-4">
          <Button
            onClick={handleButtonClick}
            disabled={isProcessing}
            className={`w-16 h-16 rounded-full transition-all duration-300 ${
              isProcessing
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse'
                : isSpeaking
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse'
                : isListening
                ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
            }`}
          >
            {isProcessing ? (
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : isSpeaking ? (
              <Volume2 className="w-8 h-8 text-white" />
            ) : isListening ? (
              <Mic className="w-8 h-8 text-white" />
            ) : (
              <MicOff className="w-8 h-8 text-white" />
            )}
          </Button>
        </div>
        
        <h3 className="text-white text-lg font-semibold mb-2">Cosmo AI</h3>
        
        <p className="text-purple-300 text-sm mb-2">
          {isProcessing
            ? 'Обрабатываю запрос...'
            : isSpeaking
            ? 'Говорю...'
            : isListening
            ? 'Слушаю вас...'
            : prompt}
        </p>
        
        {transcript && (
          <div className="mt-3 p-2 bg-black/20 rounded">
            <p className="text-green-400 text-xs mb-1">Вы сказали:</p>
            <p className="text-white text-sm">"{transcript}"</p>
          </div>
        )}
        
        {response && response !== transcript && (
          <div className="mt-2 p-2 bg-black/20 rounded">
            <p className="text-blue-400 text-xs mb-1">Cosmo AI ответил:</p>
            <p className="text-white text-sm">"{response}"</p>
          </div>
        )}
        
        {context && (
          <p className="text-gray-400 text-xs mt-2">{context}</p>
        )}
      </div>
    </Card>
  );
};

export default VoiceAssistant;
