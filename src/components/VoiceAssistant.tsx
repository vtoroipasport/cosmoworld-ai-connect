
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2 } from 'lucide-react';

// Extend Window interface for Speech Recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  onCommand?: (command: string) => void;
  prompt?: string;
  context?: string;
}

const VoiceAssistant = ({ onCommand, prompt = "Скажите команду", context = "" }: VoiceAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');

  const responses = {
    'привет': 'Привет! Я Cosmo AI, ваш голосовой помощник. Чем могу помочь?',
    'помощь': 'Я могу помочь вам с навигацией по приложению, поиском товаров, отправкой платежей и многим другим.',
    'поиск': 'Что вы хотите найти? Я могу найти товары, услуги, людей или информацию.',
    'платеж': 'Хотите отправить платеж? Скажите сумму и получателя.',
    'такси': 'Вызвать такси? Скажите адрес назначения.',
    'еда': 'Хотите заказать еду? Какую кухню предпочитаете?',
    'группа': 'Хотите создать группу или найти существующую?',
    'работа': 'Ищете работу или исполнителей? Укажите специализацию.',
    'маркетплейс': 'Что хотите купить или продать на маркетплейсе?'
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ru-RU';
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'ru-RU';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        console.log('Cosmo AI: Начинаю слушать...');
      };

      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase();
        setTranscript(command);
        console.log('Распознанная команда:', command);
        
        // Поиск подходящего ответа
        let response = 'Извините, не понял команду. Попробуйте еще раз.';
        for (const [key, value] of Object.entries(responses)) {
          if (command.includes(key)) {
            response = value;
            break;
          }
        }

        speak(response);
        
        if (onCommand) {
          onCommand(command);
        }
      };

      recognition.onerror = (event: any) => {
        console.error('Ошибка распознавания речи:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      console.log('Распознавание речи не поддерживается');
      // Симуляция для демонстрации
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const mockCommand = 'поиск товаров';
        setTranscript(mockCommand);
        speak('Хорошо, начинаю поиск товаров для вас.');
        if (onCommand) onCommand(mockCommand);
      }, 2000);
    }
  };

  const stopListening = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsListening(false);
    setIsSpeaking(false);
  };

  return (
    <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30 backdrop-blur-sm">
      <div className="p-4 text-center">
        <div className="mb-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            className={`w-16 h-16 rounded-full transition-all duration-300 ${
              isListening
                ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
                : isSpeaking
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse'
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-110'
            }`}
          >
            {isSpeaking ? (
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
          {isSpeaking
            ? 'Говорю...'
            : isListening
            ? 'Слушаю вас...'
            : prompt}
        </p>
        {transcript && (
          <p className="text-green-400 text-xs">
            Последняя команда: "{transcript}"
          </p>
        )}
        {context && (
          <p className="text-gray-400 text-xs mt-2">{context}</p>
        )}
      </div>
    </Card>
  );
};

export default VoiceAssistant;
