// import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
import ForumpostDetails from '../components/ForumpostDetails'
import ForumpostForm from '../components/ForumpostForm'

const Home = () => {
    const {forumposts, dispatch} = useForumpostContext()
    const {user} = useAuthContext()

    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch('/api/forumposts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // setForumposts(json)
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
            {/* <h2>Home</h2> */}
            <ForumpostForm/>
            <div className='forumposts'>
                {forumposts && forumposts.map((forumpost) => (
                    <ForumpostDetails key = {forumpost._id} forumpost= {forumpost}></ForumpostDetails>
                    // <p key={forumpost._id}>{forumpost.title}</p>
                ))}
            </div>
        </div>
    )
}

export default Home