
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
    const { prompt, service, context } = await req.json();

    let systemPrompt = '';
    
    switch (service) {
      case 'jobs':
        systemPrompt = 'Вы AI-помощник CosmoJobs. Помогаете подбирать исполнителей и заказы, даете советы по ценообразованию и качественному выполнению работ.';
        break;
      case 'housing':
        systemPrompt = 'Вы AI-помощник для аренды жилья. Работаете как Airbnb - помогаете найти идеальное жилье, консультируете по ценам, районам и условиям.';
        break;
      case 'food':
        systemPrompt = 'Вы AI-помощник доставки еды. Работаете как iFood - рекомендуете рестораны, блюда, следите за акциями и временем доставки.';
        break;
      case 'marketplace':
        systemPrompt = 'Вы AI-помощник маркетплейса. Работаете как eBay - помогаете с покупками, продажами, оценкой товаров и безопасными сделками.';
        break;
      case 'messenger':
        systemPrompt = 'Вы AI-помощник мессенджера. Работаете как Telegram - помогаете с общением, переводом, поиском контактов и группами.';
        break;
      default:
        systemPrompt = 'Вы полезный AI-помощник экосистемы Cosmo. Отвечайте кратко и по делу.';
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in cosmo-ai-assistant function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
