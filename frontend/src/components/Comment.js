import { useFPCommentContext } from '../hooks/useFPCommentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useEffect } from 'react'


export const Comment = ({ comment, id }) => {
    const {user} = useAuthContext()
    const { commentDispatch } = useFPCommentContext()

    const handleDelete = async () => {
        if (!user) {
            return
        }
        console.log("here1");

        const response = await fetch(`/api/forumposts/${id}/comments/${comment._id}`, {

            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        console.log("here ");
        const json = await response.json()
        if (response.ok) {
            commentDispatch({type: 'DELETE_COMMENT', payload: json})
        }
    }

    return (
        <div className="forumpostDetails">
            <p><strong>Content: </strong>{comment.content}</p>
            <p><strong>User: </strong>{comment.userId}</p>
            <p><strong>Created At:</strong>{comment.createdAt}</p>
            <button className='delete' onClick={handleDelete}>Delete</button>
        </div>
    )
}
