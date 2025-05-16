import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/components/context/AuthContext';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Trash2,
  AlertTriangle,
  ExternalLink,
  Shield,
  KeyRound,
  XCircle,
  CheckCircle,
  ArrowRightCircle
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const DeleteAccount: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState('');
  const [checkedAccess, setCheckedAccess] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmDelete !== user?.email) {
      toast.error("Email doesn't match. Account deletion canceled.");
      return;
    }

    setIsDeleting(true);
    try {
      const response = await axios.delete(`${API_BASE_URL}/auth/delete/${user?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'api-key': API_KEY,
        },
      });

      if (!response.data.revokeAcess) {
        toast.error("There was an error revoking access to your account. Redirecting to where you can do it manually");

        setTimeout(() => {
          window.location.href = "https://myaccount.google.com/permissions";
        }, 5000); // 3-second delay
      }

      toast.success("Account successfully deleted");
      localStorage.removeItem('testInfo');
      logout();
      window.location.href = "/";
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to delete account";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Trash2 className="h-8 w-8 text-red-600" />
        <div>
          <h2 className="text-2xl font-bold text-red-700">Delete Account</h2>
          <p className="text-gray-500">Permanently remove your account and all associated data</p>
        </div>
      </div>

      <Card className="shadow-lg border-t-4 border-t-red-500">
        <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 pb-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <CardTitle className="text-red-700">Danger Zone</CardTitle>
          </div>
          <CardDescription className="text-gray-600 ml-7">
            This action cannot be undone. Please be certain.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                Before you delete your account
              </h3>
              <p className="text-amber-700 mb-4">
                Make sure you've completed these important steps:
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {checkedAccess ?
                      <CheckCircle className="h-5 w-5 text-green-500" /> :
                      <XCircle className="h-5 w-5 text-red-400" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Revoke access to Google services</p>
                    <p className="text-sm text-gray-600 mb-2">
                      We use Google OAuth for authentication. We will deal with revoking access but feel free to check to ensure.
                    </p>
                    <a
                      href="https://myaccount.google.com/permissions"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setCheckedAccess(true)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Remove access in Google Account Settings
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ArrowRightCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Back up any important data</p>
                    <p className="text-sm text-gray-600">
                      Once your account is deleted, all your data will be permanently removed from our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-200 pt-5">
              <div className="space-y-2">
                <Label htmlFor="confirm-delete" className="flex items-center gap-1.5 text-gray-700 font-medium">
                  <KeyRound className="h-4 w-4 text-red-500" />
                  Confirm Account Deletion
                </Label>
                <p className="text-sm text-gray-600">
                  To confirm deletion, please type your email address: <span className="font-medium">{user?.email}</span>
                </p>
                <div className="relative">
                  <Input
                    id="confirm-delete"
                    placeholder="Enter your email address"
                    value={confirmDelete}
                    onChange={(e) => setConfirmDelete(e.target.value)}
                    className="pl-10 border border-red-200 rounded-md focus:border-red-500 focus:ring focus:ring-red-200 focus:ring-opacity-50"
                  />
                  <KeyRound className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="mt-4 bg-red-600 hover:bg-red-700 text-white flex items-center gap-2"
                    disabled={confirmDelete !== user?.email}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete My Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-red-300">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-red-700 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Delete Account Permanently?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-2">
                      <p>This action <strong>cannot be undone</strong>. This will permanently delete your account and remove all associated data from our servers.</p>
                      <p className="font-medium">Are you absolutely sure you want to proceed?</p>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-gray-300">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                          Deleting...
                        </>
                      ) : (
                        "Yes, Delete My Account"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 text-sm text-gray-500 border-t border-gray-100">
          <p>If you're experiencing issues with JobPulse, please consider <a href="/settings/help" className="text-blue-600 hover:text-blue-800">contacting support</a> before deleting your account.</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeleteAccount;