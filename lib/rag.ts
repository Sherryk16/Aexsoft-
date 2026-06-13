import { supabase } from "./supabase";

const COHERE_API_KEY = process.env.COHERE_API_KEY;
const CHUNK_SIZE = 500;
const CHUNK_OVERLAP = 100;

const embedCache = new Map<string, number[]>();

async function embedOne(text: string, inputType: "search_document" | "search_query" = "search_document"): Promise<number[] | null> {
  if (!COHERE_API_KEY) return null;
  const cacheKey = `${inputType}:${text}`;
  const cached = embedCache.get(cacheKey);
  if (cached) return cached;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("https://api.cohere.ai/v1/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${COHERE_API_KEY}` },
        body: JSON.stringify({ model: "embed-multilingual-v3.0", texts: [text], input_type: inputType }),
      });
      if (res.status === 429 && attempt < 2) {
        const wait = 2000 * Math.pow(2, attempt);
        console.warn(`Cohere rate limited, retrying in ${wait}ms...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      if (!res.ok) {
        console.error("Cohere embed error:", res.status);
        return null;
      }
      const data = await res.json();
      const embedding = data.embeddings?.[0] ?? null;
      if (embedding) embedCache.set(cacheKey, embedding);
      return embedding;
    } catch (e) {
      console.error("Cohere embed exception:", e);
      if (attempt === 2) return null;
    }
  }
  return null;
}

async function embedBatch(texts: string[], inputType: "search_document" | "search_query" = "search_document"): Promise<(number[] | null)[]> {
  if (!COHERE_API_KEY || texts.length === 0) return texts.map(() => null);

  const uncached: { index: number; text: string }[] = [];
  const results: (number[] | null)[] = new Array(texts.length).fill(null);

  for (let i = 0; i < texts.length; i++) {
    const cacheKey = `${inputType}:${texts[i]}`;
    const cached = embedCache.get(cacheKey);
    if (cached) {
      results[i] = cached;
    } else {
      uncached.push({ index: i, text: texts[i] });
    }
  }

  if (uncached.length === 0) return results;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const res = await fetch("https://api.cohere.ai/v1/embed", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${COHERE_API_KEY}` },
        body: JSON.stringify({ model: "embed-multilingual-v3.0", texts: uncached.map(u => u.text), input_type: inputType }),
      });
      if (res.status === 429 && attempt < 2) {
        const wait = 2000 * Math.pow(2, attempt);
        console.warn(`Cohere batch rate limited, retrying in ${wait}ms...`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      if (!res.ok) {
        console.error("Cohere batch embed error:", res.status);
        return results;
      }
      const data = await res.json();
      if (data.embeddings) {
        for (let i = 0; i < uncached.length; i++) {
          const emb = data.embeddings[i] ?? null;
          if (emb) embedCache.set(`${inputType}:${uncached[i].text}`, emb);
          results[uncached[i].index] = emb;
        }
      }
      return results;
    } catch (e) {
      console.error("Cohere batch embed exception:", e);
      if (attempt === 2) return results;
    }
  }
  return results;
}

function chunkText(text: string, metadata: Record<string, unknown>): { content: string; metadata: Record<string, unknown> }[] {
  const chunks: { content: string; metadata: Record<string, unknown> }[] = [];
  const sentences = text.replace(/\n{3,}/g, "\n\n").split(/(?<=[.!?])\s+/);
  let buffer = "";

  for (const sentence of sentences) {
    if ((buffer + " " + sentence).trim().length <= CHUNK_SIZE) {
      buffer = (buffer + " " + sentence).trim();
    } else {
      if (buffer.trim()) {
        chunks.push({ content: buffer.trim(), metadata: { ...metadata, chunk_id: chunks.length } });
      }
      buffer = sentence;
    }
  }
  if (buffer.trim()) {
    chunks.push({ content: buffer.trim(), metadata: { ...metadata, chunk_id: chunks.length } });
  }

  return chunks;
}

export async function ingestDocument(text: string, source: string): Promise<{ ok: boolean; chunks: number; error?: string }> {
  if (!supabase) return { ok: false, chunks: 0, error: "Supabase not configured" };

  const chunks = chunkText(text, { source });

  const embeddings = await embedBatch(chunks.map(c => c.content));
  let inserted = 0;

  for (let i = 0; i < chunks.length; i++) {
    if (!embeddings[i]) continue;
    const { error } = await supabase.from("rag_documents").insert({
      content: chunks[i].content,
      metadata: chunks[i].metadata,
      embedding: `[${embeddings[i]!.join(",")}]`,
    });
    if (error) {
      console.error("Insert error:", error);
    } else {
      inserted++;
    }
  }

  return { ok: true, chunks: inserted };
}

export async function clearDocuments(): Promise<{ ok: boolean }> {
  embedCache.clear();
  if (!supabase) return { ok: false };
  const { error } = await supabase.rpc("clear_rag_documents");
  if (error) {
    await supabase.from("rag_documents").delete().not("id", "is", null);
  }
  return { ok: true };
}

const FALLBACK_CONTEXT = `AEXSOFT is a digital product agency. Services: Web Development (Next.js, React, TypeScript), AI Chatbots & Automation, SaaS Development, E-commerce. Founded 2+ years, 50+ projects, 100% satisfaction. Contact: aexsoftstudio@gmail.com`;

export async function retrieveRelevantContext(query: string, maxChunks = 5): Promise<string> {
  if (!supabase) return FALLBACK_CONTEXT;

  const queryEmbedding = await embedOne(query, "search_query");
  if (!queryEmbedding) return FALLBACK_CONTEXT;

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: `[${queryEmbedding.join(",")}]`,
    match_threshold: 0.15,
    match_count: maxChunks,
  });

  if (error) {
    console.error("RAG search error:", error);
    return FALLBACK_CONTEXT;
  }

  if (!data || data.length === 0) return FALLBACK_CONTEXT;

  return data.map((d: { content: string }) => d.content).join("\n\n");
}
