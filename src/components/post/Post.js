import React from 'react';
import './Post.scss';
import Avatar from '../avatar/Avatar';
import { useDispatch } from 'react-redux';
import { likeAndUnlike } from '../../redux/slices/postsSlice';
import { IoIosHeartEmpty, IoMdHeart } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slices/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';

const Post = ({ post }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlePostLike = async () => {
        dispatch(
            likeAndUnlike({
                postId: post?._id,
            })
        );
    };
    return (
        <div className="post">
            <div className="header">
                <Avatar src={post?.owner?.avatar?.url} />
                <h4
                    className="hover-links"
                    onClick={() => navigate(`/profile/${post?.owner?._id}`)}
                >
                    {post?.owner?.name}
                </h4>
            </div>
            <div className="content">
                <img src={post?.image?.url} alt={post?.image?.publicId} />
            </div>
            <div className="footer">
                <div className="like">
                    {post?.isLiked ? (
                        <IoMdHeart
                            className="hover-links heart"
                            onClick={handlePostLike}
                        />
                    ) : (
                        <IoIosHeartEmpty
                            className="hover-links icon"
                            onClick={handlePostLike}
                        />
                    )}
                    <h4>{`${post?.likesCount} likes`}</h4>
                </div>
                <p className="caption">
                    {' '}
                    <span
                        className="caption-name hover-links"
                        onClick={() => navigate(`/profile/${post?.owner?._id}`)}
                    >
                        {post?.owner?.name}
                    </span>{' '}
                    {post?.caption}
                </p>

                <h6 className="time-ago">{post?.timeAgo}</h6>
            </div>
        </div>
    );
};

export default Post;
