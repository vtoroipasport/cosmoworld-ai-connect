
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import ModernCard from '@/components/ModernCard';
import NeonButton from '@/components/NeonButton';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';

interface CosmoAIProps {
  service: 'jobs' | 'housing' | 'food' | 'marketplace' | 'messenger';
}

const CosmoAI = ({ service }: CosmoAIProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{ type: 'user' | 'ai', content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessage('');
    setConversation(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('cosmo-ai-assistant', {
        body: {
          prompt: userMessage,
          service,
          context: conversation.slice(-4) // Last 4 messages for context
        }
      });

      if (error) throw error;

      setConversation(prev => [...prev, { type: 'ai', content: data.response }]);
    } catch (error) {
      console.error('AI Assistant error:', error);
      setConversation(prev => [...prev, { 
        type: 'ai', 
        content: t('common.error') + ': ' + (error as Error).message 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        title="Cosmo AI"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 h-96">
      <ModernCard className="h-full flex flex-col bg-white dark:bg-gray-800 border-purple-200 dark:border-purple-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Cosmo AI</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-gray-500 dark:text-gray-400"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {conversation.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
              {t('ai.welcome')}
            </div>
          )}
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                msg.type === 'user' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('ai.placeholder')}
              className="flex-1"
              disabled={isLoading}
            />
            <NeonButton
              onClick={handleSendMessage}
              disabled={!message.trim() || isLoading}
              size="sm"
            >
              <Send className="w-4 h-4" />
            </NeonButton>
          </div>
        </div>
      </ModernCard>
    </div>
  );
};

export default CosmoAI;
