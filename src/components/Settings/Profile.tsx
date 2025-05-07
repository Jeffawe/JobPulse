import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import axios from 'axios';
import { User } from '@/components/types/auth';
import { toast } from "sonner";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import NoDiscordWebhook from '../Settings/NoDiscordWebhook';
import {
  UserCircle,
  Mail,
  Save,
  AtSign,
  Webhook,
  AlertCircle,
  Shield,
  CheckCircle2,
  Check
} from 'lucide-react';


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const ProfileSettings = () => {
  const { user, setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [discordWebhook, setDiscordWebhook] = useState('');
  const [_, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [webhookEnabled, setWebhookEnabled] = useState<boolean>(user?.discord_webhook || false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.name || '');
      setDiscordWebhook('');
      setWebhookEnabled(user.discord_webhook || false);
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSaveSuccess(false);

    const updatedData = {
      username: displayName || user?.name,
      discord_webhook: discordWebhook || user?.discord_webhook,
    };

    try {
      const response = await axios.patch<User>(
        `${API_BASE_URL}/auth/update`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'api-key': API_KEY,
          },
        }
      );

      setUser(response.data);
      toast.success('Profile updated successfully!');
      setSaveSuccess(true);

      // Reset success indicator after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <UserCircle className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Profile Settings</h2>
          <p className="text-gray-500">Manage your public profile information and notification preferences</p>
        </div>
      </div>

      <Card className="shadow-lg border-t-4 border-t-blue-500">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-6">
          <div className="flex items-center gap-2">
            <AtSign className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-blue-700">Basic Information</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ml-7">
            Update your public-facing details and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleProfileUpdate} className="space-y-5">
            {/* Email - read-only */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Mail className="h-4 w-4 text-blue-500" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  value={user?.email || ''}
                  disabled={true}
                  className="pl-10 bg-gray-50 border-gray-200 text-gray-500"
                />
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <div className="absolute right-3 top-3">
                  <Shield className="h-4 w-4 text-blue-400" />
                </div>
              </div>
              <p className="text-xs text-gray-500 ml-1">Your email address is verified and cannot be changed</p>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="display-name" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <UserCircle className="h-4 w-4 text-blue-500" />
                Display Name
              </Label>
              <div className="relative">
                <Input
                  id="display-name"
                  placeholder="Your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={user?.isTestUser}
                  className="pl-10 border border-blue-200 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <UserCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 ml-1">This is how your name will appear in JobPulse</p>
            </div>

            {/* Discord Webhook */}
            <div className="space-y-2">
              <Label htmlFor="discord-webhook" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <Webhook className="h-4 w-4 text-blue-500" />
                Discord Webhook
              </Label>

              {webhookEnabled ? (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <Check className="h-4 w-4" />
                  Webhook already saved
                </div>
              ) : (
                <div className="relative">
                  <Input
                    id="discord-webhook"
                    placeholder="https://discord.com/api/webhooks/..."
                    value={discordWebhook}
                    disabled={user?.isTestUser}
                    onChange={(e) => setDiscordWebhook(e.target.value)}
                    className="pl-10 border border-blue-200 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <Webhook className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              )}
            <p className="text-xs text-blue-600 ml-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Adding a Discord webhook ensures your data isn't stored on our servers
            </p>
          </div>

          {user?.discord_webhook === false &&
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <NoDiscordWebhook />
            </div>
          }

          <div className="pt-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-fit flex items-center gap-2 transition-all duration-300 ${saveSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                } text-white`}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 text-sm text-gray-500 border-t border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-1 text-blue-600 text-xs">
          <Shield className="h-3 w-3" />
          Your data is secure
        </div>
      </CardFooter>
    </Card>
    </div >
  );
};

export default ProfileSettings;