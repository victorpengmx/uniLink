import { useFPCommentContext } from '../hooks/useFPCommentContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

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
            // console.log(json)

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
            {<Card style={{ width: '60rem' }}>
                <Card.Body>
                    <Card.Header>{commentDetails.userId}</Card.Header>
                    <Card.Text>
                        {!editing && <p>{commentDetails.content}</p>}  
                        {editing && <Form>
                            <textarea
                                type = "text"
                                onChange = {(e) => setEditingContent(e.target.value)}
                                value = {editingContent}
                            />
                        </Form>}                          
                    </Card.Text>
                    <Card.Footer class="card-footer d-flex justify-content-between">
                        <small className="text-muted">{new Date(commentDetails.createdAt).toLocaleString()}</small>
                        {<span>
                            <ButtonGroup size="sm" className="me-2" aria-label="First group">
                                {! editing && <Button variant="primary" onClick={handleShowEditInterface}>Edit</Button>}
                                {editing && <Button variant="secondary" onClick={handleCancel}>Cancel</Button>}
                            </ButtonGroup>
                            <ButtonGroup size="sm" className="me-2" aria-label="Second group">
                                {! editing && <Button variant="primary" onClick={handleDelete}>Delete</Button>}
                                {editing && <Button variant="secondary" onClick={handleSubmit}>Save</Button>}
                            </ButtonGroup>
                        </span>}
                    </Card.Footer>
                </Card.Body>
            </Card>}
            <br/>
        </>
    )
}
