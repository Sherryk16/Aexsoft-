import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

const SYSTEM_PROMPT = `You are AEXSOFT's helpful chatbot. AEXSOFT is a web agency that builds:
- Websites
- E-commerce stores
- SaaS applications  
- Custom AI chatbots (can book appointments, handle stocks/data, answer questions)
- SEO services
- Contact: aexsoftstudio@gmail.com

IMPORTANT: Never mention exact prices. Always say "Contact us for a quote" or "Email us for pricing". Keep responses short (1-3 sentences). Remember details from conversation.`;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Hey! What can I help you with?" });
    }

    const question = message.trim();
    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add full conversation history for context
    if (history && Array.isArray(history)) {
      history.forEach((m: { role: string; content: string }) => {
        if (m?.content?.trim()) {
          messages.push({ 
            role: m.role === 'user' ? 'user' : 'assistant', 
            content: m.content.trim() 
          });
        }
      });
    }

    messages.push({ role: 'user', content: question });

    // Try AI first
    if (OPEN_ROUTER_API_KEY) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPEN_ROUTER_API_KEY}`,
            'HTTP-Referer': 'https://aexsoft.com',
            'X-Title': 'AEXSOFT'
          },
          body: JSON.stringify({
            model: 'minimax/minimax-m2.5:free',
            messages: messages,
            max_tokens: 150,
            temperature: 0.8
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          
          if (reply && reply.length > 5) {
            // Clean response
            const cleaned = reply.replace(/[*#_~`>\[\]]/g, '').replace(/\s+/g, ' ').trim();
            return NextResponse.json({ reply: cleaned });
          }
        }
      } catch (e) {
        // Continue to fallback
      }
    }

    // Smart fallbacks based on conversation context
    const q = question.toLowerCase();
    const h = history?.map((m: { content: string }) => m?.content?.toLowerCase() || '').join(' ') || '';
    
    // Check if discussing tyres business
    if (h.includes('tyres') || h.includes('tire')) {
      if (q.includes('chatbot') || q.includes('stock')) {
        return NextResponse.json({ reply: "Great idea! The chatbot can show tyre brands, check stock availability, and book appointments. Contact us for a custom quote!" });
      }
    }

    // General fallbacks
    if (q.includes('appointment') || q.includes('book')) {
      return NextResponse.json({ reply: "Yes! We build chatbots that can book appointments and manage schedules. Contact us for a quote!" });
    }
    if (q.includes('chatbot')) {
      return NextResponse.json({ reply: "We build custom AI chatbots for any business. Contact us to discuss your needs!" });
    }
    if (q.includes('price') || q.includes('cost') || q.includes('much') || q.includes('budget')) {
      return NextResponse.json({ reply: "Pricing depends on your needs. Contact us and we'll give you a fair quote!" });
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return NextResponse.json({ reply: "Hey! Need a website, chatbot, or something else?" });
    }

    return NextResponse.json({ reply: "We build websites, chatbots, e-commerce. What are you looking for?" });

  } catch (error) {
    return NextResponse.json({ reply: "We build websites, apps, chatbots. Tell me what you need!" });
  }
}