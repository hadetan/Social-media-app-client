import './Navbar.scss';
import Avatar from '../avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const navigate = useNavigate();
    const myProfile = useSelector((state) => state.appConfigReducer.myProfile);

    const handleLogout = async () => {
        
    };

    return (
        <div className="navbar">
            <div className="container">
                <h2
                    className="banner hover-links"
                    onClick={() => navigate('/')}
                >
                    Mintgram
                </h2>
                <div className="right-side">
                    <div
                        className="profile hover-links"
                        onClick={() => navigate(`/profile/${myProfile?._id}`)}
                    >
                        <Avatar src={myProfile?.avatar?.url}/>
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
