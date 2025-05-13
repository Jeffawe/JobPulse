import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AuthModal from './AuthModal';
import { Menu, X } from 'lucide-react'; // You can use any icon library you prefer
import TestAccountModal from './LogOutOption';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, logout, user } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const toggleMenu = () => setMenuOpen(prev => !prev);

    const logOutOptions = () => {
        if(user?.isTestUser){
            setIsOpen(true);
        }else{
            logout();
        }
    }

    return (
        <nav className="bg-white shadow-md px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">
                    <Link to="/">JobPulse</Link>
                </div>

                {/* Hamburger Icon */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Nav Links */}
                <div className={`flex-col md:flex-row md:flex items-center gap-4 absolute md:static bg-white left-0 w-full md:w-auto md:bg-transparent px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none z-50 transition-all duration-300 ease-in-out ${menuOpen ? 'top-16' : 'top-[-500px]'}`}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                                Dashboard
                            </Link>
                            <Link to="/settings" className="text-gray-700 hover:text-blue-600">
                                Settings
                            </Link>
                            <button
                                onClick={logOutOptions}
                                className="text-red-500 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={openModal}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Sign In / Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>

            <TestAccountModal isOpen={isOpen} setIsOpen={setIsOpen} />
            {/* Auth Modal */}
            <AuthModal isOpen={isModalOpen} setisOpen={setIsModalOpen} />
        </nav>
    );
};

export default Navbar;
