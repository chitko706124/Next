/*
  # Blog Schema Setup

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `slug` (text, unique)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
  2. Security
    - Enable RLS on `posts` table
    - Add policies for:
      - Public read access to published posts
      - Admin full CRUD access
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published posts
CREATE POLICY "Public can read published posts" 
  ON posts
  FOR SELECT
  USING (published = true);

-- Allow authenticated users (admin) full access
CREATE POLICY "Admin has full access" 
  ON posts
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');