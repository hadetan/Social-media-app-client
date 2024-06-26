import React from 'react';
import './Post.scss';
import Avatar from '../avatar/Avatar';
import { CiHeart } from 'react-icons/ci';

const Post = ({ post }) => {
    return (
        <div className="post">
            <div className="header">
                <Avatar />
                <h4 className='hover-links'>Aquib Ali</h4>
            </div>
            <div className="content">
                <img
                    src="https://images.pexels.com/photos/15286/pexels-photo.jpg"
                    alt="user post"
                />
            </div>
            <div className="footer">
                <div className="like">
                    <CiHeart className='hover-links icon'/>
                    <h4>4 likes</h4>
                </div>
                <p className='caption'>This is my first trip to amazon Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quaerat? Voluptatum, tempora consectetur. Fugiat eaque ea deserunt reprehenderit praesentium nemo eligendi enim error saepe inventore ipsam corporis repellat reiciendis debitis, sed suscipit quas dolorem provident sapiente atque molestias sint earum. Pariatur libero numquam, repellendus consectetur exercitationem dolore laborum deserunt non, unde cumque totam suscipit maiores quis eius ipsa! Ipsam quasi quis quibusdam harum id quidem vel ipsa, magnam est dolores beatae tempora fugiat, reiciendis, in mollitia vitae. Ab rem velit, aut assumenda repudiandae sapiente necessitatibus architecto accusamus provident quis vitae ad quidem a nobis maiores repellendus, harum neque recusandae illo?</p>
                <h6 className='time-ago'>4 hrs ago</h6>
            </div>
        </div>
    );
};

export default Post;
