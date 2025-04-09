import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';
import axios from 'axios';
import { User } from '@/components/types/auth';
import { toast } from "sonner"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const ProfileSettings = () => {
  const { user, setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [error, setError] = useState('')

  useEffect(() => {
    // Update the state if user data changes
    if (user) {
      setDisplayName(user.name);
    }
  }, [user]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updatedData = {
      username: displayName || user?.name,
    };

    try {
      const response = await axios.patch<User>(
        `${API_BASE_URL}/auth/${user?._id}`,
        updatedData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'api-key': API_KEY,
          },
        }
      );
  
      // If the request was successful
      const updatedUser = response.data;
      setUser(updatedUser);
    } catch (error: any) {
      setError(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-gray-500">Manage your public profile information</p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Tell others about yourself
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div>
              <Label htmlFor="display-name">Display Name</Label>
              <Input
                id="display-name"
                placeholder="Your display name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error &&
        toast.error(error, { duration: 4000 }) 
      }
    </div>
  );
};

export default ProfileSettings;