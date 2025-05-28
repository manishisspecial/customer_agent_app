import React, { useState, useEffect } from 'react';
import { verifyDatabaseConnection, supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const TestConnection = () => {
  const [dbStatus, setDbStatus] = useState('Checking connection...');
  const [testResult, setTestResult] = useState('');
  const { signUp } = useAuth();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      // First, check if we can connect to Supabase
      const { data: authData, error: authError } = await supabase.auth.getSession();
      
      if (authError) {
        console.error('Auth connection error:', authError);
        setDbStatus('Failed to connect to Supabase authentication');
        return;
      }

      // Then check database tables
      const isConnected = await verifyDatabaseConnection();
      setDbStatus(isConnected ? 'Connected to database' : 'Database connection failed');
    } catch (error) {
      console.error('Connection check error:', error);
      setDbStatus('Error checking connection');
    }
  };

  const createTestAccount = async () => {
    try {
      setTestResult('Creating test account...');
      
      const timestamp = Date.now();
      const testUser = {
        email: `test${timestamp}@beyondchats.com`, // Using a more legitimate-looking domain
        password: 'TestPass123!', // More complex password
        role: 'customer',
        customer_name: 'Test User',
        customer_mobile_number: '1234567890',
      };

      // First, check if we can access the customers table
      const { error: tableCheckError } = await supabase
        .from('customers')
        .select('count')
        .limit(1);

      if (tableCheckError) {
        throw new Error(`Database table error: ${tableCheckError.message}`);
      }

      // Try to create the user
      await signUp(testUser.email, testUser.password, {
        role: testUser.role,
        customer_name: testUser.customer_name,
        customer_mobile_number: testUser.customer_mobile_number,
        customer_email: testUser.email
      });

      setTestResult('Test account created successfully! Check your Supabase dashboard.');
    } catch (error) {
      console.error('Test account creation error:', error);
      setTestResult(`Error creating test account: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Database Connection Test</h2>
        
        <div className="mb-4">
          <p className="font-semibold">Database Status:</p>
          <p className={`mt-1 ${dbStatus.includes('Connected') ? 'text-green-600' : 'text-red-600'}`}>
            {dbStatus}
          </p>
        </div>

        <button
          onClick={createTestAccount}
          disabled={!dbStatus.includes('Connected')}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors
                     ${dbStatus.includes('Connected') 
                       ? 'hover:bg-blue-700' 
                       : 'opacity-50 cursor-not-allowed'}`}
        >
          Create Test Account
        </button>

        {testResult && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className={`text-sm ${testResult.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
              {testResult}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestConnection; 