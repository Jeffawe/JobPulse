import React from 'react';
import { useAuth } from './context/AuthContext';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';

interface AuthModalProps {
    isOpen: boolean;
    setisOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, setisOpen }) => {
    const { googleLogin } = useAuth();

    const handleGoogleSignIn = () => {
        try {
            const params = new URLSearchParams({
                client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
                response_type: 'code',
                scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.settings.basic https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.labels https://www.googleapis.com/auth/gmail.settings.basic',
                access_type: 'offline',       // Required for refresh token
                prompt: 'consent select_account',  
                include_granted_scopes: 'true'          // Forces refresh token every time (only on first time ideally)
            });

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

            // Redirect user to Google consent screen
            window.location.href = authUrl;
        } catch (error) {
            toast.error('Google Login Failed. Please try again.');
        }
    };

    const handleTestUserSignIn = async () => {
        try {
            await googleLogin('test', true);
            setisOpen(false);
        } catch (error) {
            console.error('Error creating test user:', error);
            toast.error('Test User Creation Failed. Please try again.');
        }
    }

    const closeModal = () => {
        setisOpen(false);
    }

    return (
        <div className="w-full max-w-md mx-auto">

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-white/10 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-medium"
                        >
                            ×
                        </button>

                        {/* Modal content */}
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">Get Started with JobTrackr</h2>
                            <p className="text-gray-600">Connect your account to start tracking job applications</p>
                        </div>

                        <div className="space-y-4">
                            <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors">
                                <svg viewBox="0 0 24 24" width="18" height="18" className="flex-shrink-0">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-gray-700 font-medium">Continue with Google</span>
                            </button>

                            <button onClick={handleTestUserSignIn} className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 transition-colors">
                                <Settings className="flex-shrink-0" />
                                <span className="text-gray-700 font-medium">Create a Test User</span>
                            </button>

                            <div className="pt-4 text-center border-t border-gray-200">
                                <p className="text-sm text-gray-500">More login options coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AuthModal;
