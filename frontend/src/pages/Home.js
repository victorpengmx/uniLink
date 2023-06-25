// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ForumpostPreview from '../components/ForumpostPreview'
import SearchForm from "../pages/SearchForm";

const Home = () => {
    const { forumposts, dispatch } = useForumpostContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchForumposts = async () => {
            // Fetch all forum posts from the API
            const response = await fetch("/api/forumposts", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "SET_FORUMPOSTS", payload: json });
            }
        };

        if (user) {
            fetchForumposts();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <SearchForm />

            <div className="forumposts">
                {forumposts &&
                    forumposts.map((forumpost) => (
                        <div className="forumpostPreview" key={forumpost._id}>
                            <ForumpostPreview forumpost={forumpost} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Home;
