import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useFPCommentContext } from '../hooks/useFPCommentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Comment } from "../components/Comment";
import { CommentForm } from "../components/CommentForm";

import { useNavigate } from "react-router-dom";

const ViewForumpost = () => {
    const {user} = useAuthContext()
    const { id } = useParams()
    const {comments, commentDispatch} = useFPCommentContext()

    const [forumpost, dispatch] = useState(null)
    const [editing, setEdit] = useState(false)
    const [editingContent, setEditingContent] = useState(null)

    const navigate = useNavigate()

    const [fetched, changeFetch] = useState(false);

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
                changeFetch(true)
            }
        }

        const fetchComments = async () => {
            if (forumpost) {
                const response = await fetch(`/api/forumposts/${id}/comments`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                })
                const json = await response.json()

                if (response.ok) {
                    commentDispatch({type: 'SET_COMMENTS', payload: json})
                }
            }
        }

        // if user is logged in
        if (user) {
            fetchForumposts()
            fetchComments()
        }
    }, [dispatch, commentDispatch, user, id, fetched])

    // delete function
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
        // return to home page
        navigate("/")
    }

    // edit function
    const handleEdit = async () => {
        if (!user) {
            return
        }
        setEditingContent(forumpost.content)
        setEdit(true)
    }

    // cancels edit and returns to forum page
    const handleCancel = () => {
        if (!user) {
            return
        }
        setEdit(false)
    }

    // sets changes to post being edited
    const handleSubmit = async (e) => {
        if (!user) {
            return
        }

        const title = forumpost.title
        const description = forumpost.description
        const content = editingContent
        const user_id = forumpost.user_id
        const createdAt = forumpost.createdAt

        const editpost = {title, description, content, user_id, createdAt}

        const response = await fetch('/api/forumposts/' + forumpost._id, {
            method: 'PATCH',
            body: JSON.stringify(editpost),
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
            dispatch(editpost)
            setEdit(false)
        }
    }

    console.log(user);
    console.log(forumpost);

    return (
        <div>
            {/* if editing state is false, show post */}
            {!editing && forumpost && <div className="viewForumposts">
                <div className="heading">
                    <h4>{forumpost.title}</h4>
                    <div className="actions">
                        {
                            user._id == forumpost.user_id &&
                            <div>
                            <button className='edit' onClick={handleEdit}>Edit</button>
                            <span className="space"></span>
                            <button className = 'delete' onClick={handleDelete}>
                                Delete
                            </button>
                            </div>
                        }
                    </div>
                </div>
                <p>Id = {id}</p>
                <p>User id = {user._id}</p>
                <p>dispatch = {dispatch}</p>
                <p><strong>Content: </strong>{forumpost.content}</p>
                <p><strong>User: </strong>{forumpost.user_id}</p>
                <p>{forumpost.createdAt}</p>
            </div>}

            {/* if editing state is true, show editing interface */}
            {editing && forumpost && <div className="editForumposts">
                <div className="heading">
                    <h4>{forumpost.title}</h4>
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

            <div>
                {forumpost && <CommentForm postId={forumpost._id} />}
            </div>
            <div>
                {console.log(Array.isArray(comments))}
                {console.log(id)}
                {comments && comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} id={id} ></Comment>
                ))}
            </div>

        </div>
    )
}

export default ViewForumpost;
