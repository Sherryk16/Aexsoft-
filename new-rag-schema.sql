-- Run this SQL in your Supabase SQL Editor to set up RAG

-- 1. Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create documents table for RAG knowledge base
CREATE TABLE IF NOT EXISTS rag_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  embedding VECTOR(1024),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create index for similarity search (cosine distance)
CREATE INDEX IF NOT EXISTS rag_documents_embedding_idx 
  ON rag_documents 
  USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);

-- 4. Create match_documents function for similarity search
CREATE OR REPLACE FUNCTION match_documents(
  query_embedding VECTOR(1024),
  match_threshold FLOAT DEFAULT 0.15,
  match_count INT DEFAULT 5
)
RETURNS TABLE(
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    rag_documents.id,
    rag_documents.content,
    rag_documents.metadata,
    1 - (rag_documents.embedding <=> query_embedding) AS similarity
  FROM rag_documents
  WHERE 1 - (rag_documents.embedding <=> query_embedding) > match_threshold
  ORDER BY rag_documents.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 5. Enable Row Level Security
ALTER TABLE rag_documents ENABLE ROW LEVEL SECURITY;

-- 6. Allow public access (anon key) for all operations
DROP POLICY IF EXISTS "Allow public all" ON rag_documents;
CREATE POLICY "Allow public all" ON rag_documents
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 7. Create function to clear all documents
CREATE OR REPLACE FUNCTION clear_rag_documents()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM rag_documents;
END;
$$;

-- 8. Grant access
GRANT EXECUTE ON FUNCTION match_documents(VECTOR(1024), FLOAT, INT) TO anon;
GRANT EXECUTE ON FUNCTION match_documents(VECTOR(1024), FLOAT, INT) TO authenticated;
GRANT EXECUTE ON FUNCTION clear_rag_documents() TO anon;
GRANT EXECUTE ON FUNCTION clear_rag_documents() TO authenticated;
