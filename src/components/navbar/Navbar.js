import React, { useRef, useState } from 'react';
import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import LoadingBar from 'react-top-loading-bar';

const Navbar = () => {
    const navigate = useNavigate();
    const loadingRef = useRef()
    const [loading, setLoading] = useState(false)

    const toggleLoading = () => {
        if (loading) {
            setLoading(false);
            loadingRef.current.complete();
        } else {
            setLoading(true);
            loadingRef.current.continuousStart();
        }
    }

    return (
        <div className="navbar">
            <LoadingBar color='#00caca' ref={loadingRef} />
            <div className="container">
                <h2
                    className="banner hover-links"
                    onClick={() => navigate('/')}
                >
                    Mintgram
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-links"
                        onClick={() => navigate('/profile/sdlfja')}
                    >
                        <Avatar />
                    </div>
                    <div className="logout hover-links" onClick={toggleLoading}>
                        <CiLogout/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
