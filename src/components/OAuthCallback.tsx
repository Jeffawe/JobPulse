import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useAuth } from './context/AuthContext.tsx';

const OAuthCallback = () => {
    const { googleLogin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        let handled = false;

        const handleGoogleAuth = async () => {
            if (handled) return;
            handled = true;

            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    await googleLogin(code);
                    toast.success('Welcome', { duration: 4000 });
                    navigate('/dashboard');
                } catch (error) {
                    toast.error('Google authentication failed. Please try again.', { duration: 4000 });
                }
            } else {
                toast.error("No code found in URL", { duration: 4000 });
            }
        };

        handleGoogleAuth();
    }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
      <p className='text-center'>Authorizing...</p>
    </div>
  );
};

export default OAuthCallback;
