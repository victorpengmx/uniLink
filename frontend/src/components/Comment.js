import { useFPCommentContext } from '../hooks/useFPCommentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'


export const Comment = ({ comment, postId }) => {
    const {user} = useAuthContext()
    const { commentDispatch } = useFPCommentContext()
    
    const [commentDetails, setCommentDetails] = useState(comment)
    const [editing, setEdit] = useState(false)
    const [editingContent, setEditingContent] = useState(comment.content)

    const [fetched, changeFetch] = useState(false);

    useEffect(() => {
        const fetchComment = async () => {
            const response = await fetch(`/api/forumposts/` + postId + "/comments/" + comment._id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                setCommentDetails(json)
                changeFetch(true)
            }

            if(user) {
                fetchComment()
            }
        }
    }, [fetched, user])

    const handleShowEditInterface = async () => {
        if (!user) {
            return
        }
        setEditingContent(editingContent)
        setEdit(true)
    }

    // cancels edit and returns to forum page
    const handleCancel = () => {
        if (!user) {
            return
        }
        setEdit(false)
    }

    const handleSubmit = async (e) => {
        if (!user) {
            return
        }

        const content = editingContent
        const userId = comment.userId
        const createdAt = comment.createdAt

        const editComment = {content, userId, postId, createdAt}

        const response = await fetch(`/api/forumposts/${postId}/comments/${comment._id}`, {
            method: 'PATCH',
            body: JSON.stringify(editComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            setCommentDetails(editComment)
            setEdit(false)
        }
    }

    const handleDelete = async () => {
        if (!user) {
            return
        }

        const response = await fetch(`/api/forumposts/${postId}/comments/${comment._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()
        if (response.ok) {
            commentDispatch({type: 'DELETE_COMMENT', payload: json})
        }
    }

    return (
        <>
            {!editing && <div className="forumpostDetails">
                <p><strong>Content: </strong>{commentDetails.content}</p>
                <p><strong>User: </strong>{commentDetails.userId}</p>
                <p><strong>Created At:</strong>{commentDetails.createdAt}</p>
                <button className='edit' onClick={handleShowEditInterface}>Edit</button>
                <button className='delete' onClick={handleDelete}>Delete</button>
            </div>}
            
            {editing && <div className="">
                <div className="heading">
                    <div className="actions">
                        <button className = 'cancel' onClick={handleCancel}>Cancel</button>
                        <span className="space"></span>
                        <button className = 'save' onClick={handleSubmit} >Save</button>
                    </div>

                    <form>
                        <label>Content:</label>
                        <textarea
                            type = "text"
                            onChange = {(e) => setEditingContent(e.target.value)}
                            value = {editingContent}
                        />
                    </form>
                </div>
            </div>}
        </>
    )
}
