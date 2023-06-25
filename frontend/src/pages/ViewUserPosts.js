import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import ForumpostPreview from '../components/ForumpostPreview';

const ViewUserPosts = ({ userId }) => {
    const { user } = useAuthContext();
    const [userPosts, setUserPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`/api/forumposts/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const data = await response.json();

                if (response.ok) {
                    setUserPosts(data);
                } else {
                    console.log('Error fetching user posts:', data.error);
                }
            } catch (error) {
                console.log('Error fetching user posts:', error);
            }
        };

        if (user) {
            fetchUserPosts();
        } else {
            navigate('/login');
        }
    }, [userId, user, navigate]);

    return (
        <div className="userPosts">
            <h2>Your Posts</h2>
            {userPosts.length > 0 ? (
                userPosts.map((post) => (
                    <div className="forumpostPreview" key={post._id}>
                        <ForumpostPreview forumpost={post} />
                    </div>
                ))
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default ViewUserPosts;
