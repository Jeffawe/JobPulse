import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './context/AuthContext';

const Navbar : React.FC = () => {
    const { isAuthenticated, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">JobTrackr</Link>
            </div>
            <div className="navbar-menu">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className="navbar-item">Dashboard</Link>
                        <Link to="/settings" className="navbar-item">Settings</Link>
                        <button onClick={logout} className="btn-logout">Logout</button>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <button className="btn-login">Login</button>
                        <button className="btn-signup">Sign Up</button>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;