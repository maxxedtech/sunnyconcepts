-- ===================================================================
-- SUNNY CONCEPTS — PRODUCTION DATABASE SCHEMA
-- Execute in Supabase SQL Editor (Dashboard > SQL Editor)
-- ===================================================================

-- 1. Enable pgcrypto for UUID generation if not already active
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Portfolio Items Table
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  storage_path TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Portfolio Categories Table
CREATE TABLE IF NOT EXISTS public.portfolio_categories (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Site Settings Key-Value Table
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security (RLS) Configuration
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 6. Public Read / Anon Policies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_items' AND policyname = 'Public Read Portfolio Items'
  ) THEN
    CREATE POLICY "Public Read Portfolio Items" ON public.portfolio_items FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_items' AND policyname = 'Anon All Portfolio Items'
  ) THEN
    CREATE POLICY "Anon All Portfolio Items" ON public.portfolio_items FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_categories' AND policyname = 'Public Read Portfolio Categories'
  ) THEN
    CREATE POLICY "Public Read Portfolio Categories" ON public.portfolio_categories FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_categories' AND policyname = 'Anon All Portfolio Categories'
  ) THEN
    CREATE POLICY "Anon All Portfolio Categories" ON public.portfolio_categories FOR ALL USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Public Read Site Settings'
  ) THEN
    CREATE POLICY "Public Read Site Settings" ON public.site_settings FOR SELECT USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'site_settings' AND policyname = 'Anon All Site Settings'
  ) THEN
    CREATE POLICY "Anon All Site Settings" ON public.site_settings FOR ALL USING (true);
  END IF;
END $$;

-- 7. Seed Default Categories
INSERT INTO public.portfolio_categories (name, slug, display_order)
VALUES
  ('Brand Identity', 'brand-identity', 1),
  ('Media Production', 'media-production', 2),
  ('Digital Marketing', 'digital-marketing', 3),
  ('Printing & Logistics', 'printing-logistics', 4),
  ('Art Cover', 'art-cover', 5),
  ('Birthday Flyers', 'birthday-flyers', 6),
  ('Church Flyers', 'church-flyers', 7),
  ('Logos & Branding', 'logos-brand-identity', 8)
ON CONFLICT (slug) DO NOTHING;
