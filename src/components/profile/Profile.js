import React, { useEffect, useState } from 'react';
import './Profile.scss';
import Post from '../post/Post';
import { useNavigate, useParams } from 'react-router-dom';
import CreatePost from '../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slices/postsSlice';
import user from '../../assets/imgs/user.png';
import { followAndUnfollowUser } from '../../redux/slices/feedSlice';

const Profile = () => {
    const navigate = useNavigate();
    const params = useParams();
    const userProfile = useSelector((state) => state.postsReducer.userProfile);
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const feedData = useSelector((state) => state.feedReducer.feedData);
    const dispatch = useDispatch();
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        dispatch(
            getUserProfile({
                userId: params.userId,
            })
        );

        setIsMyProfile(myProfile?._id === params.userId);
        setIsFollowing(
            feedData?.followings?.find((item) => item._id === params.userId)
        );
    }, [myProfile, params.userId, feedData]);

    const handleUserFollow = () => {
        dispatch(
            followAndUnfollowUser({
                userIdToFollow: params.userId,
            })
        );
    };

    return (
        <div className="profile">
            <div className="container">
                <div className="left-part">
                    {isMyProfile && <CreatePost />}
                    {userProfile?.posts?.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
                <div className="right-part">
                    <div className="profile-card">
                        <img
                            className="user-img"
                            src={userProfile?.avatar?.url || user}
                            alt={userProfile?.name}
                        />
                        <h3 className="user-name">{userProfile?.name}</h3>
                        <p className="user-name">{userProfile?.bio}</p>
                        <div className="follower-info">
                            <h4>{`${userProfile?.followers?.length} Followers`}</h4>
                            <h4>{`${userProfile?.followings?.length} followings`}</h4>
                        </div>

                        {!isMyProfile && (
                            <button
                                onClick={handleUserFollow}
                                className={
                                    isFollowing
                                        ? 'follow btn-secondary'
                                        : 'follow btn-primary'
                                }
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}

                        {isMyProfile && (
                            <button
                                className="update-profile btn-secondary"
                                onClick={() => navigate('/updateProfile')}
                            >
                                Update profile
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
