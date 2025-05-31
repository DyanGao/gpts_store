import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase environment variables are missing!')
  console.error('Please create a .env.local file with:')
  console.error('NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key')
  
  // Throw an error to prevent the app from running with invalid config
  throw new Error('Supabase configuration is missing. Please check your environment variables.')
}

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase