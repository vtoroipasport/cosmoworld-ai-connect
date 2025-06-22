
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { audio, text, action } = await req.json();

    // Обработка аудио транскрипции
    if (audio && action === 'transcribe') {
      // Декодируем base64 аудио
      const binaryString = atob(audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Создаем FormData для Whisper API
      const formData = new FormData();
      const blob = new Blob([bytes], { type: 'audio/webm' });
      formData.append('file', blob, 'audio.webm');
      formData.append('model', 'whisper-1');
      formData.append('language', 'ru');

      const transcribeResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
        },
        body: formData,
      });

      if (!transcribeResponse.ok) {
        throw new Error(`Whisper API error: ${await transcribeResponse.text()}`);
      }

      const transcription = await transcribeResponse.json();
      return new Response(JSON.stringify({ text: transcription.text }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Обработка текстового запроса к ChatGPT
    if ((text || audio) && action === 'chat') {
      let userPrompt = text;
      
      // Если есть аудио, сначала транскрибируем его
      if (audio && !text) {
        const binaryString = atob(audio);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const formData = new FormData();
        const blob = new Blob([bytes], { type: 'audio/webm' });
        formData.append('file', blob, 'audio.webm');
        formData.append('model', 'whisper-1');
        formData.append('language', 'ru');

        const transcribeResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
          },
          body: formData,
        });

        if (transcribeResponse.ok) {
          const transcription = await transcribeResponse.json();
          userPrompt = transcription.text;
        }
      }

      // Отправляем запрос к ChatGPT
      const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Ты CosmoAI — голосовой ассистент из приложения CosmoLife. 
              
              CosmoLife — это многофункциональное Web3 приложение, которое включает:
              - Мессенджер с чатами, голосом и видео
              - Cosmo Pay для криптоплатежей
              - Аренду жилья с умным бронированием
              - Такси с картой водителей
              - Доставку еды с ИИ рекомендациями
              - Поиск работы и вакансий
              - Маркетплейс для покупок и продаж
              - Группы до 10М участников
              - Web3 кошелек с поддержкой COSMO токенов
              
              Отвечай кратко, дружелюбно и понятно. Помогай пользователям с навигацией по приложению, 
              поиском сервисов, объяснением функций Web3 кошелька, созданием групп, 
              поиском товаров на маркетплейсе и использованием всех возможностей CosmoLife.
              
              Всегда отвечай на русском языке.`
            },
            { role: 'user', content: userPrompt }
          ],
          max_tokens: 150,
          temperature: 0.8,
        }),
      });

      if (!chatResponse.ok) {
        throw new Error(`ChatGPT API error: ${await chatResponse.text()}`);
      }

      const chatResult = await chatResponse.json();
      const responseText = chatResult.choices[0].message.content;

      // Генерируем аудио ответ
      const ttsResponse = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'nova',
          input: responseText,
        }),
      });

      if (!ttsResponse.ok) {
        throw new Error(`TTS API error: ${await ttsResponse.text()}`);
      }

      const audioBuffer = await ttsResponse.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

      return new Response(JSON.stringify({ 
        text: responseText,
        audio: base64Audio 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in cosmo-voice-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
