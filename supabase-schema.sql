-- Run this SQL in your Supabase SQL Editor to fix the table

-- Add is_deleted column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT false;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow everyone full access to projects" ON projects;
DROP POLICY IF EXISTS "Allow public read access to projects" ON projects;
DROP POLICY IF EXISTS "Allow authenticated full access to projects" ON projects;

-- Create a function that bypasses RLS for delete
CREATE OR REPLACE FUNCTION delete_project(project_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  DELETE FROM projects WHERE id = project_id;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION delete_project(UUID) TO anon;
GRANT EXECUTE ON FUNCTION delete_project(UUID) TO authenticated;

-- Update the public read policy to also check is_deleted
CREATE POLICY "Public can view active projects" ON projects
  FOR SELECT USING (is_active = true AND (is_deleted = false OR is_deleted IS NULL));