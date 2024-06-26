import React from 'react';
import './Avatar.scss';
import userImg from '../../assets/imgs/user.png';

const Avatar = ({ src }) => {
    return (
        <div className="avatar">
            <img src={src ? src : userImg} alt="User avatar" />
        </div>
    );
};

export default Avatar;
