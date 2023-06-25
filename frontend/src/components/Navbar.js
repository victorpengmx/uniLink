import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useNavigate } from 'react-router-dom';
import SearchForm from '../pages/SearchForm';
import ViewForumpost from "../pages/ViewForumpost";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>uniLink</h2>
                </Link>
                <nav className="navbar-links">
                    <Link to="/">Home</Link>
                </nav>
                <nav className="navbar-links">
                    <Link to="/forumpostform">New Post</Link> {/* New Post tab */}
                </nav>

                <nav className="navbar-links">

                    <Link to="/viewmypost">My Post</Link> {/* New Post tab */}
                </nav>

                <nav className="navbar-user">
                    {/* If user is logged in */}
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}

                    {/* If user is not logged in */}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
