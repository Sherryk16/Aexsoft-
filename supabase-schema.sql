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

-- Create a function that bypasses RLS for admin to see all projects
CREATE OR REPLACE FUNCTION get_all_projects()
RETURNS SETOF projects
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY SELECT * FROM projects ORDER BY display_order ASC;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION delete_project(UUID) TO anon;
GRANT EXECUTE ON FUNCTION delete_project(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_all_projects() TO anon;
GRANT EXECUTE ON FUNCTION get_all_projects() TO authenticated;

-- Update the public read policy to also check is_deleted
CREATE POLICY "Public can view active projects" ON projects
  FOR SELECT USING (is_active = true AND (is_deleted = false OR is_deleted IS NULL));

-- Storage bucket policies for project-images
-- Run these if you get upload/permission errors for images
-- First, ensure the bucket exists:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('project-images', 'project-images', true) ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public access to view files
CREATE POLICY "Public can view project images" ON storage.objects
  FOR SELECT USING (bucket_id = 'project-images');

-- Allow anon users to upload files (needed for admin upload)
CREATE POLICY "Anon can upload project images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'project-images');