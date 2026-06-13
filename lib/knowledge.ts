export interface KnowledgeEntry {
  source: string;
  content: string;
}

export function getAllKnowledge(): KnowledgeEntry[] {
  return [
    {
      source: "company-overview",
      content: `AEXSOFT is a premier digital product agency dedicated to technical excellence. Founded 2+ years ago, we have delivered 50+ projects with 100% client satisfaction. We serve clients globally with a remote-first approach. Our team combines a remote-first mindset with global standards to deliver high-performance software solutions. We are a precision-driven global agency.`,
    },
    {
      source: "company-philosophy",
      content: `The AEXSOFT Philosophy: Founded on the principle that technical precision is the bedrock of digital success, we have grown from a small collective of elite engineers into a full-service agency. Our journey began with a vision to bridge the gap between complex engineering and elegant product design. We don't just build apps; we architect ecosystems. Every line of code is written with scalability and maintenance in mind, ensuring that our clients' investments remain valuable for years to come.`,
    },
    {
      source: "company-timeline",
      content: `AEXSOFT Timeline: 2023 - The Beginning. Founded by a team of elite engineers with a vision to bridge complex engineering and elegant design. 2024 - Scaling Up. Expanded to 15+ team members, delivered 30+ projects across multiple industries. 2025 - Global Reach. Serving clients worldwide with a remote-first, globally distributed team.`,
    },
    {
      source: "core-values",
      content: `AEXSOFT Core Values: Quality - Uncompromising standards in code, design, and documentation. Speed - Rapid deployment cycles without sacrificing architectural integrity. Innovation - Leveraging cutting-edge stacks to solve complex business problems. Client-First - Transparent communication and radical alignment with your goals. Clean Code - Every project follows industry best practices with comprehensive documentation. Security First - Enterprise-grade security measures built into every line of code. Global Team - Distributed across time zones to provide 24/7 development coverage. Quality Guarantee - 30-day post-launch support ensures bug-free delivery every time.`,
    },
    {
      source: "why-choose-us",
      content: `Why Choose AEXSOFT: 2+ years of experience, 50+ projects shipped, 100% satisfaction rate. 30-day bug-free guarantee. Fast delivery (4-6 weeks standard). Competitive pricing. Technical Expertise - 2+ years delivering production-grade software. Speed and Agility - Agile sprints with daily updates. 30-Day Guarantee - Every project ships with a 30-day bug-free guarantee and full documentation.`,
    },
    {
      source: "tech-stack",
      content: `AEXSOFT Technology Stack: Next.js (App Router, Server Components), React 19 with hooks and context, TypeScript (full type safety), Tailwind CSS (utility-first styling), Node.js (Express and REST APIs), PostgreSQL, Supabase (Backend and Auth), Stripe (Payments), AWS (Infrastructure), Vercel (Deployment), Docker, Prisma (ORM), Python, OpenAI.`,
    },
    {
      source: "contact-info",
      content: `Contact AEXSOFT: Email: aexsoftstudio@gmail.com. Website: aexsoft.com. GitHub: github.com/Sherryk16. Instagram: @aexsoft_studio. For project inquiries, use the contact form on the website or email us directly.`,
    },
    {
      source: "web-development",
      content: `Full-Stack Web Development Service: We engineer pixel-perfect, scalable web applications using modern frameworks like React and Next.js. Blazing-fast, secure, and SEO-optimized platforms that drive conversions. Features include Premium Engineering (conversion-optimized interfaces), Extreme Performance (95+ Lighthouse scores), Enterprise Security (bank-grade data protection), Headless Architecture (infinite scale and speed). Technologies: Next.js, React, TypeScript, Tailwind CSS, Node.js. Standard business websites take 4-8 weeks. Complex web applications range from 12-24 weeks. We offer monthly maintenance packages including security updates, bug fixes, and feature additions.`,
    },
    {
      source: "saas-development",
      content: `SaaS Development Service: Build Scalable Cloud Products. Multi-tenant architectures designed to scale from 100 to 1,000,000 users. Priority on security, high availability, and seamless third-party integrations. Features include Multi-Tenant Architecture (secure data isolation per customer), Analytics Dashboards (real-time business insights), API-First Design (seamless third-party integrations), Enterprise Security (SOC2 and GDPR compliance), High Performance (optimized database queries and caching), Cloud Native (deployed on AWS/Vercel with auto-scaling and 99.9% uptime). Technologies: Next.js, Supabase, Stripe, PostgreSQL, AWS, Prisma. MVP development typically takes 8-16 weeks. Full-featured SaaS products range from 16-32 weeks. We integrate Stripe for flexible billing models including subscriptions, usage-based pricing, and one-time payments.`,
    },
    {
      source: "ecommerce",
      content: `E-commerce Solutions Service: Stores That Convert and Scale Globally. From boutique stores to global brands — we build high-converting e-commerce experiences with seamless checkout, inventory management, and payment processing. Features include Inventory Management (real-time stock tracking with automated low-stock alerts), SEO Optimized (built with structured data markup for Google Shopping), Payment Integration (Stripe, PayPal, Apple Pay, and local payment methods), Mobile-First Design (lightning-fast responsive checkout), Sales Analytics (track revenue, conversion rates, and customer behavior), Multi-Currency (support for multiple currencies and languages). Technologies: Next.js, Shopify Plus, Stripe, Vercel, GraphQL, Tailwind. Standard stores take 4-8 weeks. Custom builds with advanced features range from 8-16 weeks.`,
    },
    {
      source: "ai-automation",
      content: `AI Automation and Chatbots Service: Intelligent Systems That Work 24/7. Transform your business with AI-powered automation. From voice agents that handle phone calls to intelligent chatbots that qualify leads — we build systems that never sleep, never miss a lead, and continuously improve. Solutions include Voice AI Agents (autonomous voice agents handle calls with natural cadence), Omnichannel Bots (deploy across WhatsApp, Instagram and website), Custom LLM Solutions (train on your data for domain-specific AI), Workflow Automation (connect AI to your tools seamlessly). Technologies: OpenAI, LangChain, Python, Vector DB, WhatsApp API, Twilio, ElevenLabs, Rasa, Pinecone, n8n. Basic FAQ bots can be live in 1-2 weeks. Complex voice agents and custom LLMs typically take 4-8 weeks. Our models support 50+ languages.`,
    },
    {
      source: "voice-ai-agents",
      content: `Voice AI Agents: Autonomous Voice Conversations. Our voice AI agents handle inbound and outbound calls with natural human-like cadence. They understand context, handle objections, and seamlessly transfer to human agents when needed. Features include Natural Speech (advanced TTS and STT with human-like intonation), Context Aware (remembers conversation history), Multi-Turn Dialog (handles complex conversations with proper fallback logic), GDPR Compliant (enterprise-grade security with call recording and consent management).`,
    },
    {
      source: "whatsapp-bots",
      content: `WhatsApp and Omnichannel Bots: Scale Customer Support Globally. Deploy intelligent chatbots across WhatsApp, Instagram, Facebook Messenger, and your website. Handle orders, answer FAQs, and provide 24/7 support in multiple languages. Use cases include E-commerce Assistant (product recommendations, order tracking, and cart recovery with Shopify and Stripe integration) and Lead Qualification Bot (auto-qualify leads with conversational forms, schedule meetings, push data to CRM).`,
    },
    {
      source: "custom-llm-solutions",
      content: `Custom LLM Solutions: Your Own AI Brain. Train custom language models on your proprietary data. Build internal knowledge bases, document assistants, and domain-specific AI that understands your business. Use cases include Document Q&A System (upload PDFs, docs, and knowledge bases for instant answers with source citations) and Code Assistant (train on your codebase and internal docs for instant answers about architecture, APIs, and coding standards).`,
    },
    {
      source: "workflow-automation",
      content: `Workflow Automation Service: Automate Repetitive Tasks. Connect AI to your existing tools. Automate data entry, generate reports, send notifications, and trigger actions across your entire tech stack. Features include No-Code Integration (connect 5000+ apps via Zapier, Make, or custom APIs), Smart Document Processing (extract data from invoices, forms, and contracts automatically), Team Notifications (AI alerts your team via Slack, Email, or SMS), Analytics Dashboard (track automation ROI, response times, and customer satisfaction).`,
    },
    {
      source: "ai-benefits",
      content: `Benefits of AI Automation: 24/7 Availability - never miss a lead, your AI works around the clock. 3x More Leads - instant response times and proactive follow-up convert more prospects. 70% Cost Reduction - automate 70% of routine inquiries without sacrificing quality. Enterprise Security - SOC 2 compliant, encrypted data, and GDPR ready.`,
    },
    {
      source: "faq-general",
      content: `Frequently Asked Questions about AEXSOFT services: What is your typical project timeline? For standard business websites, we typically deliver in 4-6 weeks. SaaS and complex AI integrations usually range from 12-24 weeks depending on technical complexity. How do you handle post-launch maintenance? We offer several maintenance tiers from basic security updates to dedicated monthly development hours. Every project includes a 30-day bug-free guarantee. Do you offer fixed-price or hourly billing? We primarily work on fixed-project basis for well-defined scopes. For ongoing R&D or undefined work, we offer flexible retainer models. How long does it take to deploy a chatbot? Basic FAQ bots can be live in 1-2 weeks. Complex voice agents and custom LLMs typically take 4-8 weeks. Can the AI be trained on our proprietary data? Absolutely. We use vector databases to embed your documents, ensuring your data never leaves your infrastructure. Can you work with our existing codebase? Yes, we have experience integrating with legacy systems.`,
    },
    {
      source: "process",
      content: `AEXSOFT Development Process: Step 1 - Discovery: We analyze your requirements, user needs, and business goals. Step 2 - Design: Wireframes, UI mockups, and interactive prototypes. Step 3 - Development: Agile sprints with continuous integration and testing. Step 4 - Launch: Deployment, performance optimization, and post-launch support.`,
    },
    {
      source: "booking-reservation-systems",
      content: `Booking and Reservation Systems Development: AEXSOFT builds custom booking and reservation systems for businesses of all types. We develop solutions for appointment booking, event reservations, table booking for restaurants, hotel room reservations, service scheduling, and rental booking platforms. Features include real-time availability calendars, automated confirmation emails and SMS, payment integration (Stripe, PayPal), calendar sync (Google Calendar, Outlook), waitlist management, cancellation and rescheduling with smart rules, multi-language and multi-currency support, admin dashboard with analytics, customer management with history and preferences, and mobile-responsive booking widgets. Technologies used: Next.js, React, TypeScript, Supabase, PostgreSQL, Stripe, Google Calendar API, Twilio for SMS, Resend for emails. Typical delivery time is 4-8 weeks for a standard booking system. These systems can be integrated with existing websites or built as standalone applications.`,
    },
    {
      source: "custom-development",
      content: `Custom Software Development: AEXSOFT builds tailored digital solutions for specific business needs. This includes custom booking systems, reservation platforms, inventory management, CRM systems, internal tools, dashboards, and admin panels. Every project starts with a discovery phase to understand requirements, followed by design, agile development, and launch with ongoing support. We use modern tech stack: Next.js, React, TypeScript, Supabase, PostgreSQL, Node.js. We deliver in 4-12 weeks depending on complexity.`,
    },
  ];
}
