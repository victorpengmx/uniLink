import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"
import { useFPCommentContext } from "../hooks/useFPCommentContext"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const CommentForm = (postId) => {

    const [content, setContent] = useState('')
    const [error, setError] = useState(null)
    const { commentDispatch } = useFPCommentContext()

    const {user} = useAuthContext()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You are not logged in')
            return
        }

        const comment = {
            "content": content,
            "postId": postId,
            "userId": user.email
        }

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
            console.log(postId)
            commentDispatch({type: 'CREATE_COMMENT', payload: json})
        }
    }

    return (
        <div>
        <Form>
            <textarea
                type = "text"
                placeholder="Write a comment"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}
            />

            <Button size='sm' onClick={handleSubmit}>Create comment</Button>

            {error && <div className="error">{error}</div>}
        </Form>
        </div>
    )
}
