import { useParams } from "react-router-dom";
import { useEffect } from 'react'
import { useForumpostContext } from '../hooks/useForumpostContext'
import { useAuthContext } from '../hooks/useAuthContext'

import ForumpostDetails from '../components/ForumpostDetails'

const ViewForumpost = () => {
    const { id } = useParams()
    const {forumpost, dispatch} = useForumpostContext()
    const {user} = useAuthContext()

    // upon loading page
    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch(`/api/forumposts/` + id, {
                method: 'GET',
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
        <div>
            {<div className="forumpostDetails">
                <div className="heading">
                <h4>{forumpost.title}</h4>
                <div className="actions">
                <button className = 'edit' /*onClick={handleEdit}*/>Edit</button>
                <span className="space"></span>
                <button className = 'delete' /*onClick={handleDelete}*/>Delete</button>
                </div>
                </div>
                
                <p><strong>Content: </strong>{forumpost.content}</p>
                <p><strong>User: </strong>{forumpost.user_id}</p>
                <p>{forumpost.createdAt}</p>
                
            </div>}
        </div>

        // <div>
        // {/* {forumposts && forumposts.map((forumpost) => ( */}
        //     <div className="forumpostPreview">
        //         <ForumpostDetails key={forumpost._id} forumpost={forumpost}></ForumpostDetails>
        //     </div>
        // {/* ))} */}
        // </div>
    )
}
 
export default ViewForumpost;