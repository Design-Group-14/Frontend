import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import UserPage from './pages/UserPage';
import LeftNavbar from './components/LeftNavbar';
import RightNavbar from './components/SearchBar';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
    return (
        <Router>
            <div className="flex">
                <LeftNavbar />
                <div className="flex-grow flex justify-center items-center min-h-screen">
                    <Routes>
                        {/* <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/dashboard" element={<DashboardPage />} /> */}
                        <Route path="/" element={< HomePage />} /> 
                        {/* <Route path="/user/:username" element={<UserPage />} /> */}
                    </Routes>
                </div>
                <RightNavbar />
            </div>
        </Router>
    );
}

export default App;