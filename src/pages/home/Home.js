import React, { useEffect } from 'react';
import { axiosClient } from '../../utils/axiosClient';
import Navbar from '../../components/navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Navbar />
            <div className="outlet" style={{ marginTop: '60px' }}>
                <Outlet />
            </div>
        </>
    );
};

export default Home;
