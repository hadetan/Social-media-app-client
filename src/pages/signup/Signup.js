import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.scss';
import { axiosClient } from '../../utils/axiosClient';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axiosClient.post('/auth/signup', {
                name,
                email,
                password,
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
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
                <p className="create-account">
                    <Link to="/login" className="Link">
                        Already have an account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
