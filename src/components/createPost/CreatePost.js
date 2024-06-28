import React, { useState } from 'react';
import './CreatePost.scss';
import Avatar from '../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { BsCardImage } from 'react-icons/bs';
import { axiosClient } from '../../utils/axiosClient';
import { setLoading } from '../../redux/slices/appConfigSlice';

const CreatePost = () => {
    const [postImg, setPostImg] = useState('');
    const [caption, setCaption] = useState('');
    const dispatch = useDispatch();
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setPostImg(fileReader.result);
                console.log(fileReader.result);
            }
        };
    };

    const handlePostSubmit = async () => {
        try {
            dispatch(setLoading(true));
            const result = await axiosClient.post('/posts/', {
                caption,
                postImg,
            });
            console.log('post created', result);
        } catch (error) {
        } finally {
            dispatch(setLoading(false));
            setCaption('');
            setPostImg('');
        }
    };
    return (
        <div className="createPost">
            <div className="left-part">
                <Avatar src={myProfile?.avatar.url}/>
            </div>
            <div className="right-part">
                {postImg && (
                    <div className="img-container">
                        <img
                            className="post-img"
                            src={postImg}
                            alt={myProfile?.name}
                        />
                    </div>
                )}

                <input
                    type="text"
                    className="captionInput"
                    placeholder="What's on your mind?"
                    value={caption || ''}
                    onChange={(e) => setCaption(e.target.value)}
                />

                <div className="bottom-part">
                    <div className="input-post-img">
                        <label htmlFor="inputImg" className="labelImg">
                            <BsCardImage />
                        </label>
                        <input
                            id="inputImg"
                            className="inputImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <button
                        className="post-btn btn-primary"
                        onClick={handlePostSubmit}
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
