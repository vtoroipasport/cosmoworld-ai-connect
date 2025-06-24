
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Plus, Paperclip, Smile, Phone, Video, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';

const Messenger = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Привет! Как дела?',
      sender: 'Анна',
      time: '10:30',
      isOwn: false
    },
    {
      id: 2,
      text: 'Отлично! Спасибо за вопрос 😊',
      sender: 'Вы',
      time: '10:32',
      isOwn: true
    },
    {
      id: 3,
      text: 'Планируешь что-то на выходные?',
      sender: 'Анна',
      time: '10:35',
      isOwn: false
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'Вы',
        time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="glass-card border-b border-gray-300 dark:border-gray-700 sticky top-0 z-10 bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">АП</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">Анна Петрова</h1>
              <p className="text-sm text-green-600 dark:text-green-400">в сети</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Phone className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Video className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="max-w-md mx-auto flex flex-col h-[calc(100vh-140px)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <ModernCard className={`max-w-xs px-4 py-2 ${
                msg.isOwn 
                  ? 'bg-blue-600 dark:bg-blue-700 text-white border-blue-600 dark:border-blue-700' 
                  : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}>
                <p className={`text-sm ${msg.isOwn ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                  {msg.text}
                </p>
                <p className={`text-xs mt-1 ${
                  msg.isOwn ? 'text-blue-100 dark:text-blue-200' : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {msg.time}
                </p>
              </ModernCard>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-end space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Paperclip className="w-5 h-5" />
            </Button>
            <div className="flex-1">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Напишите сообщение..."
                className="border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
            <Button variant="ghost" size="sm" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <Smile className="w-5 h-5" />
            </Button>
            <NeonButton 
              variant="primary" 
              size="sm"
              onClick={handleSendMessage}
              disabled={!message.trim()}
            >
              <Send className="w-4 h-4" />
            </NeonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
