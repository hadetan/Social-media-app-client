import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { axiosClient } from '../../utils/axiosClient';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStrorageManager';

const Navbar = () => {
    const navigate = useNavigate();
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

    const handleLogout = async () => {
        try {
            await axiosClient.post('/auth/logout');
            removeItem(KEY_ACCESS_TOKEN);
            navigate('/login');
        } catch (error) {}
    };

    return (
        <div className="navbar">
            <div className="container">
                <h2
                    className="banner hover-links"
                    onClick={() => navigate('/')}
                >
                    <span className="mintgram">M</span>intgram
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-links"
                        onClick={() => navigate(`/profile/${myProfile?._id}`)}
                    >
                        <Avatar src={myProfile?.avatar?.url} />
                    </div>
                    <div className="logout hover-links" onClick={handleLogout}>
                        <CiLogout />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
