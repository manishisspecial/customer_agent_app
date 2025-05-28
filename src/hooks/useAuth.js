import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, createUser, createProfile } from '../lib/supabase';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        setUser(session.user);
        setUserRole(session.user.user_metadata.role);
      } else {
        setUser(null);
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        setUserRole(session.user.user_metadata.role);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, additionalData) => {
    try {
      const { role } = additionalData;
      const table = role === 'agent' ? 'agents' : 'customers';

      // Step 1: Create auth user directly
      const user = await createUser(email, password, role);
      
      if (!user?.id) {
        throw new Error('Failed to create user account');
      }

      // Step 2: Check if profile already exists
      const { data: existingProfile } = await supabase
        .from(table)
        .select('*')
        .eq('email', email)
        .single();

      if (existingProfile) {
        // Profile exists, just update it
        const { error: updateError } = await supabase
          .from(table)
          .update({
            updated_at: new Date().toISOString(),
            ...(role === 'agent' ? {
              agent_name: additionalData.agent_name,
              agent_mobile_number: additionalData.agent_mobile_number,
              department: additionalData.department
            } : {
              customer_name: additionalData.customer_name,
              customer_mobile_number: additionalData.customer_mobile_number
            })
          })
          .eq('email', email);

        if (updateError) throw updateError;
      } else {
        // Create new profile
        const profileData = {
          user_id: user.id,
          email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...(role === 'agent' ? {
            agent_name: additionalData.agent_name,
            agent_mobile_number: additionalData.agent_mobile_number,
            department: additionalData.department
          } : {
            customer_name: additionalData.customer_name,
            customer_mobile_number: additionalData.customer_mobile_number
          })
        };

        await createProfile(table, profileData);
      }

      // Step 3: Set local state
      setUser(user);
      setUserRole(role);
      
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      // Clean up if profile creation failed
      if (error.message.includes('profile')) {
        await supabase.auth.signOut();
      }
      throw error;
    }
  };

  const signIn = async (email, password, role) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed - no user returned');

      setUser(data.user);
      setUserRole(role);
      return data.user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setUserRole(null);
    } catch (error) {
      console.error('Signout error:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      userRole,
      loading,
      signUp,
      signIn,
      signOut,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 