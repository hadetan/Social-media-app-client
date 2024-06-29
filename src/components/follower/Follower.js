import React, { useEffect, useState } from 'react';
import './Follower.scss';
import Avatar from '../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';
import { useNavigate } from 'react-router-dom';

const Follower = ({ user }) => {
    const dispatch = useDispatch();
    const feedData = useSelector((state) => state.feedReducer.feedData);
    const [isFollowing, setIsFollowing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsFollowing(
            feedData.followings.find((item) => item._id === user._id)
        );
    }, [feedData]);

    const handleUserFollow = () => {
        dispatch(
            followAndUnfollowUser({
                userIdToFollow: user._id,
            })
        );
    };

    return (
        <div className="follower">
            <div className="user-info">
                <Avatar src={user?.avatar?.url} />
                <h4
                    className="name hover-links"
                    onClick={() => navigate(`/profile/${user._id}`)}
                >
                    {user?.name}
                </h4>
            </div>

            {isFollowing ? (
                <h5 className="unfollow-links" onClick={handleUserFollow}>
                    Unfollow
                </h5>
            ) : (
                <h5 className="follow-links" onClick={handleUserFollow}>
                    Follow
                </h5>
            )}
        </div>
    );
};

export default Follower;
