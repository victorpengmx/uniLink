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
    const [editingContent, setEditingContent] = useState('')

    const [fetched, changeFetch] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchForumposts = async () => {
            const response = await fetch(`/api/forumposts/` + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()
            console.log(json)

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
            fetchForumposts();
            fetchComments();
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

    // shows editing interface
    const handleShowEditInterface = async () => {
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
        const content = editingContent
        const user_id = forumpost.user_id
        // const user_id = user.email
        const createdAt = forumpost.createdAt

        const editpost = {title, content, user_id, createdAt}

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

    const postId = id

    return (
        <div>
            {/* if editing state is false, show post */}
            {!editing && forumpost && <div className="viewForumposts">
                <div className="heading">
                    <h4>{forumpost.title}</h4>
                    <div className="actions">
                        {
                            // user._id == forumpost.user_id &&
                            <div>
                            <button className='edit' onClick={handleShowEditInterface}>Edit</button>
                            <span className="space"></span>
                            <button className = 'delete' onClick={handleDelete}>
                                Delete
                            </button>
                            </div>
                        }
                    </div>
                </div>
                <p>Id = {id}</p>
                {/* <p>User id = {user._id}</p> */}
                {/* <p>dispatch = {dispatch}</p> */}
                <p><strong>Content: </strong>{forumpost.content}</p>
                <p><strong>User: </strong>{forumpost.user_id}</p>
                <p>{new Date(forumpost.createdAt).toLocaleString()}</p>
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
                {forumpost && <CommentForm postId={postId} />}
            </div>
            <div>
                {comments && comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} postId={postId} ></Comment>
                ))}
            </div>

        </div>
    )
}

export default ViewForumpost;
