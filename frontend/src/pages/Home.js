// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ForumpostDetails from '../components/ForumpostDetails'
import ForumpostForm from './ForumpostForm'

const Home = () => {
    const {forumposts, dispatch} = useForumpostContext()
    const {user} = useAuthContext()

    // upon loading page
    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch('/api/forumposts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({type: 'SET_FORUMPOSTS', payload: json})
            }
        }

        // if user is logged in
        if (user) {
            fetchForumposts()
        }
    }, [dispatch, user])

    return (
        <div className="home">
            <Link to="/forumpostform">New Post</Link>
            {/* <ForumpostForm/> */}
            <div className='forumposts'>
                {forumposts && forumposts.map((forumpost) => (
                    <div className="forumpostPreview">
                        {/* <Link to={`/viewforumposts/${forumpost._id}`}> */}
                            <ForumpostDetails key={forumpost._id} forumpost={forumpost}></ForumpostDetails>
                        {/* </Link> */}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home