import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  User,
  Bell,
  Webhook,
  Trash2,
  LifeBuoy,
  Hammer,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const SettingsLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();
  
  const isTestUser = user?.isTestUser || false;
  
  const navigationItems = [
    {
      name: 'Profile',
      path: '/settings/profile',
      icon: User,
      description: 'Edit your public profile information'
    },
    {
      name: 'Notification Settings',
      path: '/settings/notifications',
      icon: Bell,
      description: 'Set your notification settings'
    },
    {
      name: 'Discord Integration',
      path: '/settings/discord',
      icon: Webhook,
      description: 'Integrate with Discord'
    },
    {
      name: 'Help & Support',
      path: '/settings/help',
      icon: LifeBuoy,
      description: 'Get help and contact support'
    },
    {
      name: 'Delete Account',
      path: '/settings/delete',
      icon: Trash2,
      description: 'Delete your account'
    },
    {
      name: 'Beta',
      path: '/settings/beta',
      icon: AlertTriangle,
      description: 'JobPulse in Beta'
    }

  ];
  
  if (isTestUser) {
    navigationItems.push({
      name: 'Test Account Settings',
      path: '/settings/test',
      icon: Hammer,
      description: 'Change and check your test account settings'
    });
  }

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate('/settings/profile');
    }
  }, [location.pathname, navigate]);

  return (
    <div className="mx-auto min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${isActive 
                      ? 'bg-blue-200 text-blue-600' 
                      : 'hover:bg-blue-100 text-gray-700'
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-sm text-gray-500 hidden md:inline">
                      {item.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1">
          <Card className="p-6">
            <Outlet />
          </Card>
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;