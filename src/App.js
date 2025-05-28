import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from './components/LandingPage';
import AgentLogin from './components/agent/AgentLogin';
import AgentSignUp from './components/agent/AgentSignUp';
import CustomerLogin from './components/customer/CustomerLogin';
import CustomerSignUp from './components/customer/CustomerSignUp';
import CustomerDashboard from './components/customer/CustomerDashboard';
import AgentDashboard from './components/agent/AgentDashboard';
import TestConnection from './components/TestConnection';
import { useAuth } from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, userRole } = useAuth();
  
  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/test-connection" element={<TestConnection />} />
        
        {/* Customer Routes */}
        <Route path="/login" element={<CustomerLogin />} />
        <Route path="/signup" element={<CustomerSignUp />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Agent Routes */}
        <Route path="/customer-service-agent/login" element={<AgentLogin />} />
        <Route path="/customer-service-agent/signup" element={<AgentSignUp />} />
        <Route 
          path="/customer-service-agent/dashboard" 
          element={
            <ProtectedRoute requiredRole="agent">
              <AgentDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
