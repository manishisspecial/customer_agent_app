// This file should only be used on the backend. Remove any frontend usage.
// If you need authentication in the frontend, use API calls to /api/auth endpoints.
// No code needed here for frontend.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Sign up a new user (customer or agent)
export async function signUp({ email, password, role, ...profile }) {
  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) return { error };

  // 2. Insert profile in the correct table
  let profileTable = role === 'agent' ? 'agent_profiles' : 'customer_profiles';
  const { error: profileError } = await supabase
    .from(profileTable)
    .insert([{ user_id: data.user.id, ...profile }]);
  if (profileError) return { error: profileError };

  return { user: data.user };
}

// Login user
export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

// Get current user
export function getCurrentUser() {
  return supabase.auth.getUser();
}

// Sign out
export function signOut() {
  return supabase.auth.signOut();
}

export const verifyToken = async (token) => {
  try {
    if (!token) {
      throw new Error('No token provided');
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    return { decoded, error: null };
  } catch (error) {
    return { decoded: null, error };
  }
}; 