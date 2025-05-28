import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfvrfxvkvjintnevqxov.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY;

if (!supabaseAnonKey) {
  throw new Error('Missing environment variable REACT_APP_SUPABASE_ANON_KEY');
}

// Initialize the Supabase client for regular operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'beyondchats_auth',
    storage: window.localStorage
  }
});

// Initialize admin client with service role for bypassing rate limits
export const adminAuthClient = supabaseServiceKey ? 
  createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  }) : null;

/**
 * Create a new user profile in the specified table
 * @param {string} table - The table name ('agents' or 'customers')
 * @param {Object} profileData - The profile data to insert
 * @returns {Promise<Object>} The created profile data
 */
export const createProfile = async (table, profileData) => {
  try {
    // Use admin client if available, otherwise fall back to regular client
    const client = adminAuthClient || supabase;
    
    const { data, error } = await client
      .from(table)
      .insert([{
        ...profileData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating profile:', error);
      throw new Error(`Failed to create profile: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Error in createProfile:', error);
    throw error;
  }
};

/**
 * Check if a user exists in Supabase Auth
 * @param {string} email - User's email
 * @returns {Promise<boolean>} Whether the user exists
 */
export const checkUserExists = async (email) => {
  try {
    const client = adminAuthClient || supabase;
    
    // Check if user exists using admin listUsers
    const { data: existingUser, error } = await client.auth.admin.listUsers({
      filter: { email }
    });

    if (error) {
      console.error('Error checking user existence:', error);
      return false;
    }

    return existingUser?.users?.length > 0;
  } catch (error) {
    console.error('Error in checkUserExists:', error);
    return false;
  }
};

/**
 * Create a new user in Supabase Auth
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @param {string} role - User's role ('agent' or 'customer')
 * @returns {Promise<Object>} The created user object
 */
export const createUser = async (email, password, role) => {
  try {
    // Use admin client if available to bypass rate limits
    const client = adminAuthClient || supabase;
    
    // First try to sign in if user exists
    const { data: signInData, error: signInError } = await client.auth.signInWithPassword({
      email,
      password
    });

    if (!signInError && signInData?.user) {
      // User exists and credentials are correct
      return signInData.user;
    }

    // If user doesn't exist or wrong password, try to create new user
    const { data, error } = await client.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: { role }
    });

    if (error) {
      // If error indicates user exists but password was wrong
      if (error.message.includes('already registered')) {
        throw new Error('Email already registered. Please sign in or use a different email.');
      }
      throw error;
    }

    if (!data?.user) {
      throw new Error('No user returned from signup');
    }

    return data.user;
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

/**
 * Verify database connection and table access
 * @returns {Promise<boolean>} Whether the connection is successful
 */
export const verifyDatabaseConnection = async () => {
  try {
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.error('Auth connection error:', authError);
      return false;
    }

    const tables = ['customers', 'agents'];
    const checkPromises = tables.map(table => 
      supabase.from(table).select('count').limit(1)
    );

    const results = await Promise.allSettled(checkPromises);
    const hasErrors = results.some(result => result.status === 'rejected' || result.value.error);

    return !hasErrors;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}; 