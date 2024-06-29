import React, { useEffect, useState } from 'react';
import './UpdateProfile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateMyProfile } from '../../redux/slices/appConfigSlice';
import user from '../../assets/imgs/user.png';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStrorageManager';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [userImg, setUserImg] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setName(myProfile?.name || '');
        setBio(myProfile?.bio || '');
        setUserImg(myProfile?.avatar?.url || '');
    }, [myProfile]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            if (fileReader.readyState === fileReader.DONE) {
                setUserImg(fileReader.result);
            }
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateMyProfile({
                name,
                bio,
                userImg,
            })
        );
    }

    const handleDelete = async () => {
        try {
            const response = await axiosClient.delete('/user/');
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/');
            console.log('delete account', response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="updateProfile">
            <div className="container">
                <div className="left-part">
                    <div className="input-user-img">
                        <label htmlFor="inputImg" className="labelImg">
                            <img src={userImg || user} alt={name} />
                        </label>
                        <input
                            id="inputImg"
                            className="inputImg"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div className="right-part">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={name}
                            type="text"
                            placeholder="Update Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            value={bio}
                            type="text"
                            placeholder="Update Bio"
                            onChange={(e) => setBio(e.target.value)}
                        />
                        <input
                            type="submit"
                            className="submit"
                            onClick={handleSubmit}
                        />
                    </form>
                    <div className="delete">
                        <p>Want to delete your account?</p>
                        <button className="btn-primary" onClick={handleDelete}>Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
