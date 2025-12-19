import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eyldkhnesadmzabfquye.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV5bGRraG5lc2FkbXphYmZxdXllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NzM4MTEsImV4cCI6MjA4MTM0OTgxMX0.ZHlyyTQ-rQKx6r0_2N6LuguDHkNeeBLVRNx31Oid9yU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      storage: AsyncStorage,
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    },
  });
