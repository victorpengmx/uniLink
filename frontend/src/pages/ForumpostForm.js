import { useState } from "react"
import { useForumpostContext } from "../hooks/useForumpostContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ForumpostForm = () => {
    const navigate = useNavigate()

    const { dispatch } = useForumpostContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        // prevents page from refreshing
        // e.preventDefault()

        // checks if user is logged in
        if (!user) {
            setError('You are not logged in')
            return
        }

        const forumpost = {
            "title": title, 
            "content": content, 
            "user_id": user.email}

        const response = await fetch('/api/forumposts', {
            method: 'POST',
            body: JSON.stringify(forumpost),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // newly added post
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setContent('')

            dispatch({type: 'CREATE_FORUMPOST', payload: json})

            setError(null)
            console.log(user.email)
            console.log('new forum post created', json)
            navigate("/")
        }
    }

    return (
        <Form>
            <h5>Create a new post</h5>
            <input
                type = "text"
                placeholder="Title"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
            />
            <br/>
            <textarea
                type = "text"
                placeholder="Content"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}
            />

            <Button size='sm' onClick={handleSubmit}>Create post</Button>

            {error && <div className="error">{error}</div>}
        </Form>
    )
}

export default ForumpostForm
