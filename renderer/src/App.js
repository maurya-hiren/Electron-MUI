import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                {/* Welcome Page */}
                <Route
                    path="/"
                    element={
                        <div className="background-container">
                            <div className="content-overlay">
                                <h1 className="welcome-text">Welcome to Weblux Manage</h1>
                                <p className="subtext">A Management System that you need</p>
                                <Link to="/login">
                                    <button className="explore-button">Enter</button>
                                </Link>
                            </div>
                        </div>
                    }
                />

                {/* Login Page */}
                <Route path="/login" element={<Login />} />

                {/* Dashboard Page */}
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
