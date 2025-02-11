import React from 'react';
import Register from '../components/Register';
import '../components/Register.css'; 

const RegisterPage = () => {
    return (
        <div className="page-container">
            <div className="form-wrapper">
                <Register />
            </div>
        </div>
    );
};

export default RegisterPage;
