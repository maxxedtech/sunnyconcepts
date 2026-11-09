import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description?: string | null;
  storage_path?: string | null;
  created_at?: string;
};

export type SiteSettingRow = {
  key: string;
  value: string;
  updated_at?: string;
};
