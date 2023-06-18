import { useForumpostContext } from "../hooks/useForumpostContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ForumpostDetails = ({forumpost}) => {
    // const { dispatch } = useForumpostContext()
    // const { user } = useAuthContext()
    
    // const handleDelete = async () => {
    //     if (!user) {
    //         return
    //     }

    //     // sends a delete request to database
    //     const response = await fetch('/api/forumposts/' + forumpost._id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': `Bearer ${user.token}`
    //         }
    //     })
    //     const json = await response.json()

    //     if (response.ok) {
    //         dispatch({type: 'DELETE_FORUMPOST', payload: json})
    //     }
    // }

    return (
        <div className="forumpostDetails">
            <div className="heading">
            <h4>{forumpost.title}</h4>
            <div className="actions">
            <button className = 'edit' >Details</button>
            <span className="space"></span>
            {/* <button className = 'delete' onClick={handleDelete}>Delete</button> */}
            </div>
            </div>
            
            <p><strong>Content: </strong>{forumpost.content}</p>
            <p><strong>User: </strong>{forumpost.user_id}</p>
            <p>{forumpost.createdAt}</p>
            
        </div>
    )
}

export default ForumpostDetails