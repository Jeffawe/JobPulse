import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/context/AuthContext';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import { Toaster } from "@/components/ui/sonner"
import ProtectedRoute from './components/context/ProtectedRoute';
import SettingsLayout from './components/Settings/Settings';
import HelpSupport from './components/Settings/HelpAndOptions';
import ProfileSettings from './components/Settings/Profile';
import NotificationSettings from './components/Settings/NotificationSettings';
import DiscordWebhook from './components/Settings/DiscordWebhook';
import DeleteAccount from './components/Settings/DeleteAccount';
import OAuthCallback from './components/OAuthCallback';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className='bg-gradient-to-br from-gray-100 to-gray-200'>
      <Navbar />
      <Routes>
        <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/googleAuth" element={<OAuthCallback />} />
        <Route path="/settings" element={<ProtectedRoute> <SettingsLayout /> </ProtectedRoute>}>
          <Route path="profile" element={<ProtectedRoute> <ProfileSettings /> </ProtectedRoute>} />
          <Route path="notifications" element={<ProtectedRoute> <NotificationSettings /> </ProtectedRoute>} />
          <Route path="help" element={<ProtectedRoute> <HelpSupport /> </ProtectedRoute>} />
          <Route path="discord" element={<ProtectedRoute> <DiscordWebhook /> </ProtectedRoute>} />
          <Route path="delete" element={<ProtectedRoute> <DeleteAccount /> </ProtectedRoute>} />
        </Route>
      </Routes>
      <Toaster richColors className='text-blue-600' position="top-right" />
    </div>
  );
};

export default App;