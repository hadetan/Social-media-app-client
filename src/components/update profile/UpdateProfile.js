import React from 'react';
import './UpdateProfile.scss';

const UpdateProfile = () => {
    return (
        <div className="updateProfile">
            <div className="container">
                <div className="left-part">
                    <img
                        className="user-img"
                        src="https://images.pexels.com/photos/15286/pexels-photo.jpg"
                        alt=""
                    />
                </div>
                <div className="right-part">
                    <form>
                        <input type="text" placeholder="Update Name" />
                        <input type="text" placeholder="Update Bio" />
                        <input type="submit" className="submit" />
                    </form>
                    <div className="delete">
                        <p>Want to delete your account?</p>
                        <button className="btn-primary">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;
