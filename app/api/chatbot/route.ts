import { NextResponse } from 'next/server';
import { retrieveRelevantContext } from '@/lib/rag';

export const dynamic = 'force-dynamic';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `You are AEXSOFT's AI sales assistant.

CRITICAL RULES:
1. ANSWER FROM KNOWLEDGE - Use the context provided below to answer accurately
2. USE AI INTELLIGENCE - If something isn't in the context, use your general knowledge to help answer
3. NEVER SAY "I DON'T KNOW" - Be confident and helpful
4. KEEP RESPONSES SHORT - 1-2 sentences max
5. NEVER GIVE SPECIFIC PRICES - Say "Contact for quote"
6. BE PROACTIVE - Suggest services, don't just answer literally
7. CONVERT TO SALES - Guide users to contact us
8. REMEMBER CONVERSATION - Don't ask same questions

Help them and invite them to contact us at aexsoftstudio@gmail.com`;

async function callOpenRouter(messages: { role: string; content: string }[], model = 'openai/gpt-4o-mini'): Promise<string | null> {
  if (!OPEN_ROUTER_API_KEY) return null;
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPEN_ROUTER_API_KEY}`,
        'HTTP-Referer': 'https://aexsoft.com',
        'X-Title': 'AEXSOFT AI',
      },
      body: JSON.stringify({ model, messages, max_tokens: 200, temperature: 0.7 }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error(`OpenRouter ${model} error:`, res.status, err.slice(0, 300));
      return null;
    }
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply || reply.length < 5) return null;
    return reply.replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
  } catch (e) {
    console.error(`OpenRouter ${model} exception:`, e);
    return null;
  }
}

async function callGemini(systemPrompt: string, history: { role: string; content: string }[], question: string): Promise<string | null> {
  if (!GEMINI_API_KEY) return null;
  const contents: { role: string; parts: { text: string }[] }[] = [];
  for (const msg of history || []) {
    if (msg.role === 'system') continue;
    contents.push({ role: msg.role === 'assistant' ? 'model' : 'user', parts: [{ text: msg.content }] });
  }
  contents.push({ role: 'user', parts: [{ text: question }] });
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemPrompt }] },
          generationConfig: { maxOutputTokens: 200, temperature: 0.7 },
        }),
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text || text.length < 5) return null;
    return text.replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ reply: "Hi! I'm AEXSOFT's AI assistant. How can I help you today?" });
    }

    const question = message.trim();
    const context = await retrieveRelevantContext(question);
    const systemPrompt = `${SYSTEM_PROMPT}\n\nRELEVANT COMPANY INFORMATION:\n${context}\n\nCurrent date: ${new Date().toLocaleDateString()}`;

    const messages: { role: string; content: string }[] = [
      { role: 'system', content: systemPrompt },
    ];

    if (history && Array.isArray(history)) {
      for (const m of history.slice(-8)) {
        if (m?.content?.trim()) {
          messages.push({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content.trim() });
        }
      }
    }
    messages.push({ role: 'user', content: question });

    // Try OpenRouter first, then Gemini
    const reply = await callOpenRouter(messages, 'openai/gpt-4o-mini')
      ?? await callGemini(systemPrompt, history || [], question);

    if (reply) {
      return NextResponse.json({ reply });
    }

    // Smart fallback using RAG context
    const firstSentence = context.split(/\.\s+/).slice(0, 3).join('. ') + '.';
    const topic = question.length > 80 ? question.slice(0, 80) + '...' : question;

    return NextResponse.json({
      reply: `Great question about "${topic}"! Here's what I know: ${firstSentence}\n\nFor more details, email us at aexsoftstudio@gmail.com and we'll get back to you within 24 hours.`
    });

  } catch (error) {
    return NextResponse.json({ reply: "We're here to help! Email us at aexsoftstudio@gmail.com with your project details." });
  }
}
