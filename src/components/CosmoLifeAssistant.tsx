
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Zap, MessageCircle, Coffee, Car, ShoppingBag, Briefcase, Home, Utensils, Calendar, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CosmoLifeAssistantProps {
  onCommand?: (command: string) => void;
}

const CosmoLifeAssistant = ({ onCommand }: CosmoLifeAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [personality, setPersonality] = useState('😊');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState<Array<{icon: any, text: string, action: string}>>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Обновление времени и персональных предложений
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      updatePersonalizedSuggestions(now);
    }, 60000);

    updatePersonalizedSuggestions(new Date());
    return () => clearInterval(timer);
  }, []);

  const updatePersonalizedSuggestions = (now: Date) => {
    const hour = now.getHours();
    let newSuggestions = [];

    if (hour >= 6 && hour < 10) {
      // Утренние предложения
      newSuggestions = [
        { icon: Coffee, text: 'Заказать утренний кофе?', action: 'order_coffee' },
        { icon: Car, text: 'Вызвать такси на работу?', action: 'call_taxi' },
        { icon: Utensils, text: 'Заказать завтрак?', action: 'order_breakfast' }
      ];
    } else if (hour >= 12 && hour < 14) {
      // Обеденные предложения
      newSuggestions = [
        { icon: Utensils, text: 'Время обеда! Заказать?', action: 'order_lunch' },
        { icon: ShoppingBag, text: 'Посмотреть акции?', action: 'view_deals' },
        { icon: Briefcase, text: 'Найти подработку?', action: 'find_work' }
      ];
    } else if (hour >= 18 && hour < 22) {
      // Вечерние предложения
      newSuggestions = [
        { icon: Home, text: 'Заказать ужин домой?', action: 'order_dinner' },
        { icon: Car, text: 'Такси домой?', action: 'taxi_home' },
        { icon: Calendar, text: 'Планы на вечер?', action: 'evening_plans' }
      ];
    } else {
      // Общие предложения
      newSuggestions = [
        { icon: MessageCircle, text: 'Написать сообщение', action: 'send_message' },
        { icon: ShoppingBag, text: 'Найти товары', action: 'shop' },
        { icon: MapPin, text: 'Найти место', action: 'find_place' }
      ];
    }

    setSuggestions(newSuggestions);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const startListening = async () => {
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
        await processVoiceCommand(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      setPersonality('🎧');

    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      toast({
        title: "Ошибка микрофона",
        description: "Не удалось получить доступ к микрофону",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
      setPersonality('🧠');
    }
  };

  const processVoiceCommand = async (audioBlob: Blob) => {
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
          action: 'chat',
          context: {
            time: currentTime.toISOString(),
            suggestions: suggestions.map(s => s.text)
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка сервера');
      }

      const result = await response.json();
      
      setTranscript(result.text || 'Не удалось распознать речь');
      setResponse(result.text || '');
      
      // Выполняем действие на основе команды
      executeCommand(result.text);
      
      if (result.audio) {
        await playResponse(result.audio);
      }
      
    } catch (error) {
      console.error('Ошибка обработки команды:', error);
      toast({
        title: "Ошибка обработки",
        description: "Не удалось обработать голосовую команду",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
      setPersonality('😊');
    }
  };

  const executeCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('кофе') || lowerCommand.includes('капучино')) {
      toast({
        title: "☕ Заказываю кофе",
        description: "Ваш капучино с корицей будет готов через 6 минут!"
      });
      navigate('/food');
    } else if (lowerCommand.includes('такси') || lowerCommand.includes('машин')) {
      toast({
        title: "🚗 Вызываю такси",
        description: "Машина подъедет через 2 минуты"
      });
      navigate('/taxi');
    } else if (lowerCommand.includes('еда') || lowerCommand.includes('заказ') || lowerCommand.includes('ужин') || lowerCommand.includes('обед')) {
      toast({
        title: "🍽️ Подбираю рестораны",
        description: "Показываю лучшие предложения рядом с вами"
      });
      navigate('/food');
    } else if (lowerCommand.includes('работа') || lowerCommand.includes('подработк') || lowerCommand.includes('фриланс')) {
      toast({
        title: "💼 Ищу работу",
        description: "Нашел 3 подходящих предложения"
      });
      navigate('/jobs');
    } else if (lowerCommand.includes('магазин') || lowerCommand.includes('купить') || lowerCommand.includes('товар')) {
      toast({
        title: "🛒 Ищу товары",
        description: "Сравниваю цены в лучших магазинах"
      });
      navigate('/marketplace');
    } else if (lowerCommand.includes('сообщение') || lowerCommand.includes('написать') || lowerCommand.includes('чат')) {
      toast({
        title: "💬 Открываю мессенджер",
        description: "Готов помочь с сообщениями"
      });
      navigate('/messenger');
    } else if (lowerCommand.includes('жилье') || lowerCommand.includes('отель') || lowerCommand.includes('аренда')) {
      toast({
        title: "🏠 Ищу жилье",
        description: "Подбираю лучшие варианты для вас"
      });
      navigate('/housing');
    }

    if (onCommand) {
      onCommand(command);
    }
  };

  const playResponse = async (base64Audio: string) => {
    try {
      setIsSpeaking(true);
      setPersonality('🗣️');
      
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
        setPersonality('😊');
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsSpeaking(false);
        setPersonality('😊');
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
      
    } catch (error) {
      console.error('Ошибка воспроизведения:', error);
      setIsSpeaking(false);
      setPersonality('😊');
    }
  };

  const handleSuggestionClick = (action: string) => {
    switch (action) {
      case 'order_coffee':
        executeCommand('заказать кофе');
        break;
      case 'call_taxi':
        executeCommand('вызвать такси');
        break;
      case 'order_breakfast':
      case 'order_lunch':
      case 'order_dinner':
        executeCommand('заказать еду');
        break;
      case 'find_work':
        executeCommand('найти работу');
        break;
      case 'shop':
        executeCommand('купить товар');
        break;
      case 'send_message':
        executeCommand('написать сообщение');
        break;
      default:
        break;
    }
  };

  const handleMainButtonClick = () => {
    if (isSpeaking) {
      // Остановить воспроизведение
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      setIsSpeaking(false);
      setPersonality('😊');
    } else if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-primary/20 overflow-hidden">
        <div className="p-6 text-center">
          {/* Заголовок с персонализацией */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="text-3xl animate-bounce">{personality}</div>
              <div>
                <h2 className="text-2xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Cosmo Life
                </h2>
                <p className="text-sm text-muted-foreground">
                  {getGreeting()}! Чем помочь?
                </p>
              </div>
            </div>
          </div>

          {/* Главная кнопка */}
          <div className="mb-6 relative">
            {(isListening || isSpeaking || isProcessing) && (
              <>
                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-primary/30 animate-ping" />
                <div className="absolute inset-0 w-40 h-40 mx-auto rounded-full border border-accent/20 animate-ping animation-delay-300" />
              </>
            )}
            
            <Button
              onClick={handleMainButtonClick}
              disabled={isProcessing}
              className={`w-32 h-32 rounded-full transition-all duration-500 transform hover:scale-110 ${
                isProcessing
                  ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl shadow-yellow-500/50'
                  : isSpeaking
                  ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 shadow-2xl shadow-green-500/50'
                  : isListening
                  ? 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 shadow-2xl shadow-red-500/50'
                  : 'bg-gradient-to-br from-primary via-accent to-primary shadow-2xl shadow-primary/50'
              }`}
            >
              {isProcessing ? (
                <Brain className="w-12 h-12 text-white animate-spin" />
              ) : isSpeaking ? (
                <Volume2 className="w-12 h-12 text-white animate-bounce" />
              ) : isListening ? (
                <Mic className="w-12 h-12 text-white animate-pulse" />
              ) : (
                <Sparkles className="w-12 h-12 text-white" />
              )}
            </Button>
          </div>

          {/* Статус */}
          <p className={`text-lg font-medium mb-4 ${
            isProcessing ? 'text-yellow-400 animate-pulse' :
            isSpeaking ? 'text-green-400' :
            isListening ? 'text-red-400 animate-pulse' :
            'text-primary'
          }`}>
            {isProcessing
              ? '🧠 Думаю и анализирую...'
              : isSpeaking
              ? '🗣️ Отвечаю вам...'
              : isListening
              ? '👂 Внимательно слушаю...'
              : 'Нажмите и скажите, что нужно!'}
          </p>

          {/* Персональные предложения */}
          {suggestions.length > 0 && !isListening && !isSpeaking && !isProcessing && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">💡 Возможно, вам пригодится:</p>
              <div className="grid grid-cols-1 gap-2">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3 bg-background/50 hover:bg-accent/20 border-primary/20"
                      onClick={() => handleSuggestionClick(suggestion.action)}
                    >
                      <Icon className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-sm">{suggestion.text}</span>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Результат распознавания */}
          {transcript && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span className="text-green-600 text-sm font-medium">Вы сказали:</span>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">"{transcript}"</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CosmoLifeAssistant;
