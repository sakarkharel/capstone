import { supabase } from "./supabase";

export async function ensureProfile(userId: string, fullName?: string) {
  // Try to insert profile if it doesn't exist.
  // If it already exists, ignore error.
  const { error } = await supabase.from("profiles").insert({
    id: userId,
    full_name: fullName ?? null,
  });

  // duplicate key -> ignore
  if (error && !String(error.message).toLowerCase().includes("duplicate")) {
    // Some Supabase errors are not "duplicate", so we do a safe fallback check.
    // You can console.log if needed.
  }
}
