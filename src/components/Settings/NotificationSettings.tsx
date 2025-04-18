import React, { useEffect, useState } from 'react';
import { toast } from "sonner";
import { NotificationChannel, NotificationStatus, User } from '../types/auth';
import {
  Trash2,
  Plus,
  Bell,
  AlertCircle,
  Check,
  Phone,
  MessageSquare,
  Mail,
  Save,
  Smartphone,
  BellRing
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NotificationEntry {
  channel: NotificationChannel;
  value: string;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const NotificationSettings: React.FC = () => {
  const [_, setError] = useState('');
  const [notifications, setNotifications] = useState<NotificationEntry[]>([]);
  const [triggerStatus, setTriggerStatus] = useState<NotificationStatus>(NotificationStatus.ALL);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { user, setUser } = useAuth();

  useEffect(() => {
    if (user) {
      const notifications = getNotifications(user);
      setNotifications(notifications);

      // Set trigger status from user data if available
      if (user.notification_status) {
        setTriggerStatus(user.notification_status as NotificationStatus);
      }
    }
  }, [user]);

  const getNotifications = (user: User): NotificationEntry[] => {
    if (!user?.notification_channel || !user?.notification_value) return [];

    const channels = user.notification_channel.split(',').map(c => c.trim());
    const values = user.notification_value.split(',').map(v => v.trim());

    return channels.map((channel, index) => ({
      channel: channel as NotificationChannel,
      value: values[index] || ''
    }));
  };

  const handleAdd = () => {
    setNotifications(prev => [...prev, { channel: NotificationChannel.WHATSAPP, value: '' }]);
  };

  const handleRemove = (index: number) => {
    const updated = [...notifications];
    updated.splice(index, 1);
    setNotifications(updated);
  };

  const handleChange = (index: number, field: keyof NotificationEntry, value: string) => {
    const updated = [...notifications];
    updated[index][field] = value as any;
    setNotifications(updated);
  };

  const handleStatusChange = (status: string) => {
    setTriggerStatus(status as NotificationStatus);
  };

  const getChannelIcon = (channel: NotificationChannel) => {
    switch (channel) {
      case NotificationChannel.WHATSAPP:
        return <Smartphone className="h-4 w-4 text-green-500" />;
      case NotificationChannel.SMS:
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case NotificationChannel.EMAIL:
        return <Mail className="h-4 w-4 text-purple-500" />;
      default:
        return <BellRing className="h-4 w-4 text-amber-500" />;
    }
  };

  const getPlaceholderByChannel = (channel: NotificationChannel) => {
    switch (channel) {
      case NotificationChannel.WHATSAPP:
        return "Enter WhatsApp number";
      case NotificationChannel.SMS:
        return "Enter phone number";
      case NotificationChannel.EMAIL:
        return "Enter email address";
      default:
        return "Enter contact details";
    }
  };

  const handleSave = async () => {
    const hasEmpty = notifications.some(n => !n.value.trim());

    if ((!triggerStatus || hasEmpty) && notifications.length > 0) {
      setError('Please fill all fields and choose a status trigger');
      toast.error('Please fill all fields and choose a status trigger');
      return;
    }

    setIsSaving(true);
    setSaveSuccess(false);
    setError('');

    const channels = notifications.map(n => n.channel).join(',');
    const values = notifications.map(n => n.value).join(',');

    const updatedData = {
      notification_channel: channels || user?.notification_channel,
      notification_value: values || user?.notification_value,
      notification_status: triggerStatus || user?.notification_status,
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

      const notifications = getNotifications(response.data);
      setNotifications(notifications);
      setUser(response.data);
      toast.success('Notification settings saved successfully!');
      setSaveSuccess(true);

      // Reset success state after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error: any) {
      const msg = error.response?.data?.message || error.message;
      setError(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="h-8 w-8 text-purple-600" />
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">Notification Settings</h2>
          <p className="text-gray-500">Set which channels to receive job updates on and when you'll be notified</p>
        </div>
      </div>

      <Card className="shadow-lg border-t-4 border-t-purple-500">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 pb-6">
          <div className="flex items-center gap-2">
            <BellRing className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-purple-700">Communication Channels</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ml-7">
            Choose how you want to receive notifications about your job applications
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {notifications.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No notification channels set up yet</p>
                <p className="text-gray-400 text-sm mb-4">Add a channel to start getting updates</p>
                <Button
                  onClick={handleAdd}
                  variant="outline"
                  className="bg-white border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add First Channel
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="grid grid-cols-12 gap-3 text-sm font-medium text-gray-600 px-1">
                    <div className="col-span-4">Channel Type</div>
                    <div className="col-span-7">Contact Details</div>
                    <div className="col-span-1"></div>
                  </div>

                  {notifications.map((notification, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 items-center bg-white p-3 rounded-lg border border-gray-200 hover:border-purple-200 transition-colors">
                      <div className="col-span-4">
                        <Select
                          value={notification.channel}
                          onValueChange={(value) => handleChange(idx, 'channel', value)}
                        >
                          <SelectTrigger className="border-gray-200 focus:ring-purple-200 focus:border-purple-300">
                            <SelectValue placeholder="Select channel" />
                          </SelectTrigger>
                          <SelectContent className='bg-white'>
                            {Object.values(NotificationChannel).map(channel => (
                              <SelectItem key={channel} value={channel} className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                  {getChannelIcon(channel as NotificationChannel)}
                                  {channel}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="col-span-7 relative">
                        <div className="absolute left-3 top-3">
                          {getChannelIcon(notification.channel)}
                        </div>
                        <Input
                          type="text"
                          placeholder={getPlaceholderByChannel(notification.channel)}
                          className="pl-10 border-gray-200 focus:ring-purple-200 focus:border-purple-300"
                          value={notification.value}
                          onChange={(e) => handleChange(idx, 'value', e.target.value)}
                        />
                      </div>

                      <div className="col-span-1 flex justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(idx)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          aria-label="Remove channel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 border-purple-200"
                  onClick={handleAdd}
                >
                  <Plus className="w-4 h-4" />
                  Add Another Channel
                </Button>
              </>
            )}

            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Label htmlFor="status-trigger" className="flex items-center gap-1.5 text-gray-700 font-medium">
                <AlertCircle className="h-4 w-4 text-purple-500" />
                Notification Trigger
              </Label>

              <p className="text-sm text-gray-600">
                Choose which job status change will trigger a notification
              </p>

              <Select value={triggerStatus} onValueChange={handleStatusChange}>
                <SelectTrigger
                  id="status-trigger"
                  className="w-full border-gray-300 focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  {Object.values(NotificationStatus).map(status => (
                    <SelectItem
                      key={status}
                      value={status}
                      className="capitalize text-sm cursor-pointer hover:bg-purple-50"
                    >
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <p className="text-xs text-gray-500 italic">
                We'll notify you when any of your job applications reach this status.
              </p>
            </div>


            <div className="pt-4">
              <Button
                className={`flex items-center gap-2 transition-all duration-300 ${saveSuccess
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                  } text-white`}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    Saving...
                  </>
                ) : saveSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Settings
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 text-sm text-gray-500 border-t border-gray-100">
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-purple-500 mt-0.5" />
            <p>Standard message rates may apply depending on your service provider</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotificationSettings;