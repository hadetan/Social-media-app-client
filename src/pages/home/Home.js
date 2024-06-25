import React, { useEffect } from 'react';
import { axiosClient } from '../../utils/axiosClient';

const Home = () => {
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await axiosClient.get('/posts/all');

        console.log('got the response', response);
    };

    return <div>Home</div>;
};

export default Home;
