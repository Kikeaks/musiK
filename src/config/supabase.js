import { createClient } from "@supabase/supabase-js";

const supabaseConexion = createClient(
  "https://emcgwvgyrlukvmxbueht.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtY2d3dmd5cmx1a3ZteGJ1ZWh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTg3NTksImV4cCI6MjAyMzkzNDc1OX0.4IqiitxR-V8wZSjBS2qXn9HwAa5yG_z33APqgjekC0w"
);

export { supabaseConexion };