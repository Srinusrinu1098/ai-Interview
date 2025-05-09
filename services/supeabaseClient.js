import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseanonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseKey, supabaseanonKey);
