import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { location } from 'react-router-dom'
import SearchForm from '../pages/SearchForm';
import ViewForumpost from "../pages/ViewForumpost";

const Navbar = () => {
    const location = useLocation()

    const { logout } = useLogout();
    const { user } = useAuthContext();

    const handleClick = () => {
        logout();
    };

    // function to reload home page upon click, if user if already on home page
    const reloadPage = () => {
        if (location.pathname == '/') {
            window.location.reload();
        } 
    }

    return (
        <header>
            <div className="navbar">
                {/* reloads page upon click */}
                <Link to="/" onClick={reloadPage}>
                    <h2>uniLink</h2>
                </Link>

                <nav className="navbar-user">
                    {/* If user is logged in */}
                    {user && (
                        <div className = "navbarlinks">
                            
                            {/* <nav className="navbar-links"> */}
                                <Link to="/">Home</Link>
                            {/* </nav> */}
                            {/* <nav className="navbar-links"> */}
                                <Link to="/forumpostform">New Post</Link> {/* New Post tab */}
                            {/* </nav> */}

                            {/* <nav className="navbar-links"> */}

                                <Link to="/viewmypost">My Post</Link> {}
                            {/* </nav> */}
                            {/* </span> */}
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}

                    {/* If user is not logged in */}
                    {!user && (
                        <div className ="navbarlinks">
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
