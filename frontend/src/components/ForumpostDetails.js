import { useForumpostContext } from "../hooks/useForumpostContext"

const ForumpostDetails = ({forumpost}) => {
    const {dispatch} = useForumpostContext()
    
    const handleClick = async () => {
        // sends a delete request to database
        const response = await fetch('/api/forumposts/' + forumpost._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_FORUMPOST', payload: json})
        }
    }


    return (
        <div className="forumpostDetails">
            <div className="heading">
            <h4>{forumpost.title}</h4>
            <div className="actions">
            <button className = 'edit'>Edit</button>
            <span className="space"></span>
            <button className = 'delete' onClick={handleClick}>Delete</button>
            </div>
            </div>
            
            {/* <p><strong>Description: </strong>{forumpost.description}</p> */}
            <p><strong>Content: </strong>{forumpost.content}</p>
            <p>{forumpost.createdAt}</p>
            
        </div>
    )
}

export default ForumpostDetails