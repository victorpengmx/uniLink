// import { useEffect, useState } from 'react'
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'

// components
import ForumpostDetails from '../components/ForumpostDetails'
import ForumpostForm from '../components/ForumpostForm'

const Home = () => {
    const {forumposts, dispatch} = useForumpostContext()
    // const [forumposts, setForumposts] = useState(null)

    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch('/api/forumposts')
            const json = await response.json()

            if (response.ok) {
                // setForumposts(json)
                dispatch({type: 'SET_FORUMPOSTS', payload: json})
            }
        }

        fetchForumposts()
    }, [dispatch])

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