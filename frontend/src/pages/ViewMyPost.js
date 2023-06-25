import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import ForumpostPreview from '../components/ForumpostPreview';

const ViewMyPosts = () => {
    const { user } = useAuthContext();
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                if (!user) {
                    return;
                }

                const response = await fetch(`/api/forumposts/user/${user.id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUserPosts(data);
                } else {
                    console.log('Failed to fetch user posts');
                }
            } catch (error) {
                console.log('Error fetching user posts:', error);
            }
        };

        fetchUserPosts();
    }, [user]);

    return (
        <div className="home">
            <div className="forumposts">
                {userPosts.map((forumpost) => (
                    <div className="forumpostPreview" key={forumpost._id}>
                        <ForumpostPreview forumpost={forumpost} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewMyPosts;
