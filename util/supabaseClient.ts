import { createBrowserClient } from "@supabase/ssr";
export const supabase = createBrowserClient(
  "https://joaiguichosaxkdfimdb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvYWlndWljaG9zYXhrZGZpbWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcwMTc1NDEsImV4cCI6MjAyMjU5MzU0MX0.UMMBiAYutKCw8Sa0WeJK25M_aJp6EbcV_mEf0qmxWt0"
);
