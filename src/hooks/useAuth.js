import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      // Call backend to get current user
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data && data.user) {
        setUser(data.user);
        setUserRole(data.user.role);
      } else {
        setUser(null);
        setUserRole(null);
        localStorage.removeItem('token');
      }
    } catch (error) {
      setUser(null);
      setUserRole(null);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (formData) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { error: 'Invalid server response' };
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setUserRole(data.user?.role);
    }
    return data;
  };

  const signIn = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    let data;
    try {
      data = await res.json();
    } catch (e) {
      data = { error: 'Invalid server response' };
    }
    if (data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setUserRole(data.user?.role);
    }
    return data;
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setUser(null);
    setUserRole(null);
  };

  const resetPassword = async (email) => {
    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await res.json();
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 