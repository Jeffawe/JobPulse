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

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
              <Route path="/settings" element={<ProtectedRoute> <SettingsLayout /> </ProtectedRoute>}>
                <Route path="profile" element={<ProtectedRoute> <ProfileSettings /> </ProtectedRoute>} />
                <Route path="notifications" element={<ProtectedRoute> <NotificationSettings /> </ProtectedRoute>} />
                <Route path="help" element={<ProtectedRoute> <HelpSupport /> </ProtectedRoute>} />
                <Route path="discord" element={<ProtectedRoute> <DiscordWebhook /> </ProtectedRoute>} />
              </Route>
            </Routes>
          </main>
          <Toaster richColors position="top-right" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;