import React from 'react';
import './Profile.scss';
import Post from '../post/Post';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const navigate = useNavigate();

    return (
        <div className="profile">
            <div className="container">
                <div className="left-part">
                    <Post />
                    <div className="border"></div>
                    <Post />
                    <div className="border"></div>
                    <Post />
                    <div className="border"></div>
                    <Post />
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img className='user-img' src="https://images.pexels.com/photos/15286/pexels-photo.jpg" alt="" />
                        <h3 className='user-name'>Aquib Ali</h3>
                        <div className="follower-info">
                            <h4>40 followers</h4>
                            <h4>29 following</h4>
                        </div>
                        <button className='follow btn-primary'>Follow</button>
                        <button className='update-profile btn-secondary' onClick={() => navigate('/updateProfile')}>Update profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
