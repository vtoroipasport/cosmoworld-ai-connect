import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, Zap, MessageCircle, Coffee, Car, ShoppingBag, Briefcase, Home, Utensils, Calendar, MapPin, Waves, Activity, Eye, Target, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface CosmoLifeAssistantProps {
  onCommand?: (command: string) => void;
  onClose?: () => void;
}

const CosmoLifeAssistant = ({ onCommand, onClose }: CosmoLifeAssistantProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [suggestions, setSuggestions] = useState<Array<{icon: any, text: string, action: string, color: string}>>([]);
  const [neuralActivity, setNeuralActivity] = useState(0);
  const [aiThoughts, setAiThoughts] = useState<string[]>([]);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Neural activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(Math.random() * 100);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // AI thoughts rotation
  useEffect(() => {
    const thoughts = [
      'Анализирую голосовые команды...',
      'Оптимизирую рекомендации...',
      'Изучаю предпочтения пользователя...',
      'Готов выполнить команды...',
      'Нейросеть активна и готова помочь'
    ];
    
    const interval = setInterval(() => {
      const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
      setAiThoughts(prev => [randomThought, ...prev.slice(0, 2)]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  // Time and suggestions update
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
      newSuggestions = [
        { icon: Coffee, text: 'Утренний кофе', action: 'order_coffee', color: 'from-amber-500 to-orange-600' },
        { icon: Car, text: 'Такси на работу', action: 'call_taxi', color: 'from-blue-500 to-indigo-600' },
        { icon: Utensils, text: 'Заказать завтрак', action: 'order_breakfast', color: 'from-green-500 to-emerald-600' }
      ];
    } else if (hour >= 12 && hour < 14) {
      newSuggestions = [
        { icon: Utensils, text: 'Обеденное меню', action: 'order_lunch', color: 'from-red-500 to-pink-600' },
        { icon: ShoppingBag, text: 'Горячие акции', action: 'view_deals', color: 'from-purple-500 to-violet-600' },
        { icon: Briefcase, text: 'Найти подработку', action: 'find_work', color: 'from-teal-500 to-cyan-600' }
      ];
    } else if (hour >= 18 && hour < 22) {
      newSuggestions = [
        { icon: Home, text: 'Ужин домой', action: 'order_dinner', color: 'from-rose-500 to-pink-600' },
        { icon: Car, text: 'Домой на такси', action: 'taxi_home', color: 'from-indigo-500 to-purple-600' },
        { icon: Calendar, text: 'Вечерние планы', action: 'evening_plans', color: 'from-emerald-500 to-teal-600' }
      ];
    } else {
      newSuggestions = [
        { icon: MessageCircle, text: 'Сообщения', action: 'send_message', color: 'from-blue-500 to-cyan-600' },
        { icon: ShoppingBag, text: 'Маркетплейс', action: 'shop', color: 'from-purple-500 to-pink-600' },
        { icon: MapPin, text: 'Найти место', action: 'find_place', color: 'from-green-500 to-blue-600' }
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

    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
      toast({
        title: "🎤 Микрофон недоступен",
        description: "Проверьте разрешения браузера",
        variant: "destructive"
      });
    }
  };

  const stopListening = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
      setIsProcessing(true);
    }
  };

  const processVoiceCommand = async (audioBlob: Blob) => {
    try {
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockResponses = [
        'Понял! Обрабатываю вашу команду...',
        'Отличная идея! Сейчас найду лучшие варианты.',
        'Конечно! Подбираю персональные рекомендации.',
        'Уже работаю над этим! Секундочку...'
      ];
      
      const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setTranscript('Голосовая команда распознана');
      setResponse(response);
      
      // Execute mock command
      executeCommand('найти лучшие предложения');
      
    } catch (error) {
      console.error('Ошибка обработки команды:', error);
      toast({
        title: "⚠️ Ошибка ИИ",
        description: "Попробуйте еще раз через несколько секунд",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
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
    } else {
      toast({
        title: "🤖 Cosmo анализирует",
        description: "Подбираю персональные рекомендации для вас"
      });
    }

    if (onCommand) {
      onCommand(command);
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
        executeCommand('найти информацию');
        break;
    }
  };

  const handleMainButtonClick = () => {
    if (isSpeaking) {
      const audioElements = document.querySelectorAll('audio');
      audioElements.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      setIsSpeaking(false);
    } else if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-slate-900/40 via-purple-900/20 to-blue-900/40 backdrop-blur-3xl">
        {/* Close Button */}
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 z-10 text-white/60 hover:text-white hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </Button>
        )}

        {/* Neural Network Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-accent rounded-full animate-ping animation-delay-1000" />
          <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping animation-delay-2000" />
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
            <defs>
              <linearGradient id="neural-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path d="M50,100 Q150,50 250,100 T350,150" stroke="url(#neural-gradient)" strokeWidth="1" fill="none" className="animate-pulse" />
            <path d="M100,200 Q200,150 300,200 T400,250" stroke="url(#neural-gradient)" strokeWidth="1" fill="none" className="animate-pulse animation-delay-500" />
            <path d="M0,300 Q100,250 200,300 T300,350" stroke="url(#neural-gradient)" strokeWidth="1" fill="none" className="animate-pulse animation-delay-1000" />
          </svg>
        </div>

        <div className="relative p-8 text-center">
          {/* AI Header */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${
                isProcessing ? 'from-yellow-400 via-orange-500 to-red-500' :
                isSpeaking ? 'from-green-400 via-emerald-500 to-teal-500' :
                isListening ? 'from-red-400 via-pink-500 to-purple-500' :
                'from-purple-500 via-blue-500 to-cyan-500'
              } flex items-center justify-center shadow-2xl animate-pulse`}>
                <Brain className="w-8 h-8 text-white" />
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20 animate-pulse" />
              </div>
              <div className="text-left">
                <h2 className="text-3xl font-black bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Нейроинтерфейс
                </h2>
                <p className="text-white/80 text-sm font-medium">
                  {getGreeting()}! Готов к работе
                </p>
              </div>
            </div>

            {/* Neural Activity Indicator */}
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-green-400" />
                <span className="text-xs text-white/60">Активность нейросети</span>
              </div>
              <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-500 animate-pulse"
                  style={{ width: `${neuralActivity}%` }}
                />
              </div>
            </div>

            {/* AI Thoughts */}
            {aiThoughts.length > 0 && !isListening && !isSpeaking && !isProcessing && (
              <div className="mb-4 space-y-1">
                {aiThoughts.slice(0, 1).map((thought, index) => (
                  <div key={index} className="text-xs text-white/60 italic animate-fade-in">
                    {thought}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Neural Interface */}
          <div className="mb-8 relative">
            {/* Outer Neural Rings */}
            {(isListening || isSpeaking || isProcessing) && (
              <>
                <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full border border-white/10 animate-ping" />
                <div className="absolute inset-0 w-56 h-56 mx-auto rounded-full border border-purple-400/20 animate-ping animation-delay-300" />
                <div className="absolute inset-0 w-64 h-64 mx-auto rounded-full border border-blue-400/10 animate-ping animation-delay-600" />
              </>
            )}
            
            {/* Central Neural Core */}
            <Button
              onClick={handleMainButtonClick}
              disabled={isProcessing}
              className={`relative w-40 h-40 rounded-full border-0 transition-all duration-700 transform hover:scale-110 ${
                isProcessing
                  ? 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 shadow-2xl shadow-yellow-500/50'
                  : isSpeaking
                  ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 shadow-2xl shadow-green-500/50'
                  : isListening
                  ? 'bg-gradient-to-br from-red-400 via-pink-500 to-purple-500 shadow-2xl shadow-red-500/50'
                  : 'bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500 shadow-2xl shadow-purple-500/50'
              }`}
            >
              {/* Inner Neural Pattern */}
              <div className="absolute inset-4 rounded-full border border-white/30 animate-spin-slow" />
              <div className="absolute inset-8 rounded-full border border-white/20 animate-reverse-spin" />
              
              {/* Central Icon */}
              {isProcessing ? (
                <Target className="w-16 h-16 text-white animate-spin" />
              ) : isSpeaking ? (
                <Volume2 className="w-16 h-16 text-white animate-bounce" />
              ) : isListening ? (
                <Mic className="w-16 h-16 text-white animate-pulse" />
              ) : (
                <Eye className="w-16 h-16 text-white animate-pulse" />
              )}
            </Button>
          </div>

          {/* Status Display */}
          <div className="mb-6">
            <p className={`text-xl font-bold mb-2 ${
              isProcessing ? 'text-yellow-300 animate-pulse' :
              isSpeaking ? 'text-green-300' :
              isListening ? 'text-red-300 animate-pulse' :
              'text-white'
            }`}>
              {isProcessing
                ? 'Обработка команды...'
                : isSpeaking
                ? 'Cosmo отвечает...'
                : isListening
                ? 'Слушаю команду...'
                : 'Скажите команду или выберите действие'}
            </p>
            
            {/* Voice Waveform Simulation */}
            {(isListening || isSpeaking) && (
              <div className="flex justify-center items-center gap-1 mb-4">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 bg-gradient-to-t from-blue-400 to-purple-400 rounded-full animate-pulse`}
                    style={{
                      height: `${Math.random() * 20 + 10}px`,
                      animationDelay: `${i * 100}ms`
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Smart Suggestions */}
          {suggestions.length > 0 && !isListening && !isSpeaking && !isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-white/80 font-medium">Быстрые команды</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={`group relative h-16 bg-gradient-to-r ${suggestion.color} border-0 text-white hover:scale-105 transition-all duration-300 overflow-hidden`}
                      onClick={() => handleSuggestionClick(suggestion.action)}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <Icon className="w-6 h-6 mr-3 relative z-10" />
                      <span className="font-medium relative z-10">{suggestion.text}</span>
                      <div className="absolute right-3 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Zap className="w-4 h-4" />
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Command Result */}
          {transcript && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="w-4 h-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Команда выполнена</span>
              </div>
              <p className="text-sm text-green-100">"{response}"</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CosmoLifeAssistant;
