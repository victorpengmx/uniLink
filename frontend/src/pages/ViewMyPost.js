import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import ViewUserPosts from './ViewUserPosts';

const ViewMyPost = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <div className="home">
            {user && <ViewUserPosts userId={user._id} />} {/* Updated to use user._id */}
        </div>
    );
};

export default ViewMyPost;
