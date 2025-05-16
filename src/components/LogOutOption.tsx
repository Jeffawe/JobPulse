import { X } from 'lucide-react';
import { useAuth } from './context/AuthContext';
import { toast } from 'sonner';
import axios from 'axios';

interface TestAccountModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const TestAccountModal: React.FC<TestAccountModalProps> = ({ isOpen, setIsOpen }) => {
    const { logout, user } = useAuth();

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    const handleDeleteAccount = async () => {
        try {
            await axios.delete(`${API_BASE_URL}/auth/delete/${user?.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'api-key': API_KEY,
                    'Content-Type': 'application/json',
                },
                data: {
                    email: user?.email,
                },
            });

            toast.success("Account successfully deleted");
            logout();
            localStorage.removeItem('testInfo');
            window.location.href = "/";
        } catch (error: any) {
            const msg = "Failed to delete account. Account will be deleted later";
            toast.error(msg);
        } finally {
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                <div className="flex justify-between items-center p-4 bg-blue-600 text-white">
                    <h3 className="font-medium text-lg">Account Information</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <p className="text-gray-700 mb-6">
                        Test accounts are briefly stored locally. You can either delete your account or simply logout and access it later.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-end">
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition-colors"
                        >
                            Logout
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                        >
                            Delete Test Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestAccountModal;