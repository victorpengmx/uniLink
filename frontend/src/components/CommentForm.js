import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"
import { useFPCommentContext } from "../hooks/useFPCommentContext"

export const CommentForm = () => {

    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const { commentDispatch } = useFPCommentContext()
    const { postId } = useParams()

    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You are not logged in')
            return
        }

        const comment = {content}

        const response = await fetch(`/api/forumposts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setContent('')
            setError(null)
            console.log('new comment created', json)
            commentDispatch({type: 'SET_COMMENTS', payload: json})
        }
    }

    return (
        <div>
        <form className="createComment" onSubmit={handleSubmit}>
            <label>Content:</label>
            <textarea
                type = "text"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}
            />

            <button>Create comment</button>

            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}