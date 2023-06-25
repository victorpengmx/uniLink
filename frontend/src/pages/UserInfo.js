import React, { useEffect, useState } from 'react';

const UserInfo = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('/api/userinfo', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    // Handle error
                }
            } catch (error) {
                console.error('User info error:', error);
                // Handle error
            }
        };

        fetchUserInfo();
    }, []);

    if (!user) {
        return <p>Loading user information...</p>;
    }

    return (
        <div>
            <h2>User Information</h2>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserInfo;
