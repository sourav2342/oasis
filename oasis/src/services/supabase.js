
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://barwtzwekcsurjbeplef.supabase.co'

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJhcnd0endla2NzdXJqYmVwbGVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0MzQwMjcsImV4cCI6MjAxMDAxMDAyN30.lKrvtGwKsb3jh1nlroyWBqH2HLhIi6V3wL73hmc_VMo";

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;