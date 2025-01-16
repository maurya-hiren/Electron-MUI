import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/');
    };

    return (
        <div className="login-page">
            {/* Left Section - Login Form */}
            <div className="login-section">
                <button className="back-button" onClick={handleBackClick}>
                    &#8592; Back
                </button>
                <div className="login-form-container">
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Sign in to access your dashboard</p>
                    <form className="login-form">
                        <div className="input-group">
                            <label htmlFor="username" className="input-label">Username</label>
                            <div className="input-with-icon">
                                <FaUser className="input-icon" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter your username"
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password" className="input-label">Password</label>
                            <div className="input-with-icon">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    className="input-field"
                                />
                            </div>
                        </div>
                        <button type="submit" className="login-button">Login</button>
                    </form>
                    <a href="/" className="forgot-password">Forgot Password?</a>
                </div>
            </div>

            {/* Right Section - Image */}
            <div className="image-section">
                <img
                    src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
                    alt="Login Illustration"
                />
            </div>
        </div>
    );
}

export default Login;
