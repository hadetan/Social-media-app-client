import React from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStrorageManager';
import { Navigate, Outlet } from 'react-router-dom';

const ifLoggedIn = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
    return user ? <Navigate to="/" /> : <Outlet />;
};

export default ifLoggedIn;
