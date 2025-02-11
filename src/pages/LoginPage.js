import React from 'react';
import Login from '../components/Login';
import '../components/Login.css'; 

const LoginPage = () => {
    return (
        <div className="page-container">
         
            <div className="form-wrapper">
                <Login />
            </div>
        </div>
    );
};

export default LoginPage;
