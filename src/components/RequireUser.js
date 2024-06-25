import React from 'react';
import { KEY_ACCESS_TOKEN, getItem } from '../utils/localStrorageManager';
import { Navigate, Outlet } from 'react-router-dom';

const RequireUser = () => {
    const user = getItem(KEY_ACCESS_TOKEN);
    return (
        user ? <Outlet /> : <Navigate to="/login"/>
    );
};

export default RequireUser;
