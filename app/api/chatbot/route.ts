import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const OPEN_ROUTER_API_KEY = process.env.OPEN_ROUTER_API_KEY;

const COMPANY_INFO = `
AEXSOFT - Company Information

ABOUT:
AEXSOFT is a premier digital product agency dedicated to technical excellence. Founded 2+ years ago, we've delivered 50+ projects with 100% client satisfaction. We serve clients globally with a remote-first approach.

SERVICES:

1. FULL-STACK WEB DEVELOPMENT
- Custom websites, landing pages, business sites
- Next.js 15, React, TypeScript, Tailwind CSS
- SEO-optimized, fast, secure
- Enterprise security

2. AI AUTOMATION & CHATBOTS
- Custom AI chatbots for businesses
- Voice AI agents for phone calls
- WhatsApp & Instagram bots
- Workflow automation
- Customer support automation
- Lead qualification
- Using OpenAI, LangChain, Python

3. SAAS DEVELOPMENT
- Multi-tenant cloud products
- Scalable to 1M+ users
- Analytics dashboards
- API-first architecture
- SOC2 & GDPR ready

4. E-COMMERCE
- Online stores with payments
- Inventory management
- Stripe, PayPal integration
- Mobile-first checkout

TECH STACK:
Next.js, React, TypeScript, Tailwind CSS, Node.js, Supabase, PostgreSQL, Stripe, AWS, Vercel, Docker, Python, OpenAI

CONTACT:
- Email: aexsoftstudio@gmail.com
- Website: aexsoft.com
- GitHub: github.com/Sherryk16
- Instagram: @aexsoft_studio

WHY CHOOSE US:
- 2+ years, 50+ projects, 100% satisfaction
- 30-day bug-free guarantee
- Fast delivery (4-6 weeks standard)
- Competitive pricing
`;

const SYSTEM_PROMPT = `You are AEXSOFT's AI sales assistant. You have access to all company information above.

CRITICAL RULES:
1. ANSWER FROM KNOWLEDGE - Use the company info to answer accurately
2. USE AI INTELLIGENCE - If something isn't listed, use your general knowledge to help answer
3. NEVER SAY "I DON'T KNOW" - Be confident and helpful
4. KEEP RESPONSES SHORT - 1-2 sentences max
5. NEVER GIVE SPECIFIC PRICES - Say "Contact for quote"
6. BE PROACTIVE - Suggest services, don't just answer literally
7. CONVERT TO SALES - Guide users to contact us
8. REMEMBER CONVERSATION - Don't ask same questions

Example responses:
- Ask about timeline: "Standard sites take 4-6 weeks, complex projects 12-24 weeks"
- Ask about SEO: "Yes! We build SEO-optimized websites with fast loading"
- Ask about e-commerce: "We build stores with payments, inventory, mobile-first design"
- Ask about chatbots: "We build AI chatbots for customer support, bookings, lead qualification"

Help them and invite them to contact us at aexsoftstudio@gmail.com`;

export async function POST(request: Request) {
  try {
    const { message, history } = await request.json();
    
    if (!message?.trim()) {
      return NextResponse.json({ reply: "Hi! I'm AEXSOFT's AI assistant. How can I help you today?" });
    }

    const question = message.trim();
    const messages: { role: string; content: string }[] = [
      { role: 'system', content: SYSTEM_PROMPT }
    ];

    // Add conversation history for context
    if (history && Array.isArray(history)) {
      const recentHistory = history.slice(-8);
      recentHistory.forEach((m: { role: string; content: string }) => {
        if (m?.content?.trim()) {
          messages.push({ 
            role: m.role === 'user' ? 'user' : 'assistant', 
            content: m.content.trim() 
          });
        }
      });
    }

    messages.push({ role: 'user', content: question });

    // Call AI
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
            model: 'meta-llama/llama-3.1-8b-instruct:free',
            messages: messages,
            max_tokens: 150,
            temperature: 0.7
          })
        });

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content?.trim();
          
          if (reply && reply.length > 3) {
            const cleaned = reply.replace(/^\*+|\*+$/g, '').replace(/^\#+/gm, '').replace(/\s+/g, ' ').trim();
            if (cleaned.length > 5) {
              return NextResponse.json({ reply: cleaned });
            }
          }
        }
      } catch (e) {
        console.error('AI Error:', e);
      }
    }

    // Smart fallback
    const q = question.toLowerCase();
    const context = history?.slice(-4)?.map((m: { content: string }) => m?.content?.toLowerCase() || '').join(' ') || '';

    if (q.includes('price') || q.includes('cost') || q.includes('how much') || q.includes('budget')) {
      return NextResponse.json({ reply: "Pricing depends on your requirements. Email us at aexsoftstudio@gmail.com for a custom quote!" });
    }
    if (q.includes('timeline') || q.includes('how long') || q.includes('weeks')) {
      return NextResponse.json({ reply: "Standard websites take 4-6 weeks. Complex projects like SaaS or AI take 12-24 weeks. Contact us for timeline!" });
    }
    if (q.includes('seo') || q.includes('search') || q.includes('google')) {
      return NextResponse.json({ reply: "Yes! We build SEO-optimized websites with fast loading speeds, schema markup, and Google-friendly structure." });
    }
    if (q.includes('chatbot') || q.includes('bot') || q.includes('ai')) {
      return NextResponse.json({ reply: "We build intelligent AI chatbots for customer support, bookings, lead qualification, and more. What functionality do you need?" });
    }
    if (q.includes('ecommerce') || q.includes('online store') || q.includes('shop') || q.includes('store')) {
      return NextResponse.json({ reply: "We build e-commerce stores with payments (Stripe/PayPal), inventory management, and mobile-first checkout. What products will you sell?" });
    }
    if (q.includes('website') || q.includes('web site') || q.includes('web')) {
      return NextResponse.json({ reply: "We build custom websites using Next.js, React, TypeScript. Business sites, portfolios, landing pages - what do you need?" });
    }
    if (q.includes('saas') || q.includes('software') || q.includes('app')) {
      return NextResponse.json({ reply: "We develop SaaS platforms that scale to millions of users with multi-tenant architecture, dashboards, and API integration." });
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return NextResponse.json({ reply: "Hi! Looking for a website, e-commerce store, AI chatbot, or SaaS app?" });
    }
    if (q.includes('who') && (q.includes('you') || q.includes('are'))) {
      return NextResponse.json({ reply: "I'm AEXSOFT's AI assistant! We build websites, e-commerce, SaaS apps, and AI chatbots. What can I help you with?" });
    }

    return NextResponse.json({ reply: "We build all kinds of digital products! Tell me what you need and I'll help you figure out the best solution." });

  } catch (error) {
    return NextResponse.json({ reply: "We're here to help! Email us at aexsoftstudio@gmail.com with your project details." });
  }
}