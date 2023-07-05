import { useState } from "react"
import { useForumpostContext } from "../hooks/useForumpostContext"
import { useAuthContext } from "../hooks/useAuthContext"

const ForumpostForm = () => {
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
        }
    }

    return (
        <div>
        <form className="createForumpost" onSubmit={handleSubmit}>
            <h3>Create a new post</h3>

            <label>Post Title</label>
            <input
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
            />

            <label>Content:</label>
            <textarea
                type = "text"
                onChange = {(e) => setContent(e.target.value)}
                value = {content}
            />

            <button>Create post</button>

            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default ForumpostForm
