import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.scss';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStrorageManager';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosClient.post('/auth/signup', {
                name,
                email,
                password,
            });
            setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
            navigate('/');
        } catch (error) {}
    };

    return (
        <div className="signup">
            <div className="signup-box">
                <h2 className="heading">Signup</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="name"
                        id="name"
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" className="submit" />
                </form>
                <p className="login-account">
                    <Link to="/login" className="Link hover-links">
                        Already have an account?
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
