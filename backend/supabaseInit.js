import { createClient } from '@supabase/supabase-js'
import 'dotenv/config' // TODO: do env better 

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
