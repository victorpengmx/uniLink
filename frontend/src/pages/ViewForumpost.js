import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'
import { useAuthContext } from '../hooks/useAuthContext'

import { useNavigate } from "react-router-dom";

// import ForumpostDetails from '../components/ForumpostDetails'

const ViewForumpost = () => {
    const { id } = useParams()
    // const {forumpost, dispatch} = useForumpostContext()
    const [forumpost, dispatch] = useState(null)

    const {user} = useAuthContext()

    const navigate = useNavigate()

    // upon loading page
    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch(`/api/forumposts/` + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                // dispatch({type: 'SET_FORUMPOSTS', payload: json})
                dispatch(json)
            }

            // console.log(json)
        }

        // if user is logged in
        if (user) {
            fetchForumposts()
        }
    }, [dispatch, user])

    const handleDelete = async () => {
        if (!user) {
            return
        }

        // sends a delete request to database
        const response = await fetch('/api/forumposts/' + forumpost._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_FORUMPOST', payload: json})
        }

        navigate("/")
    }

    return (
        <div>
            {forumpost && <div className="viewForumposts">
                <div className="heading">
                    <h4>{forumpost.title}</h4>
                    <div className="actions">
                        <button className = 'edit' >Edit</button>
                        <span className="space"></span>
                        <button className = 'delete' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                
                <p><strong>Content: </strong>{forumpost.content}</p>
                <p><strong>User: </strong>{forumpost.user_id}</p>
                <p>{forumpost.createdAt}</p>
            </div>}

        </div>


    )
}
 
export default ViewForumpost;
