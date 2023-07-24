import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const ViewEvent = () => {
    const {user} = useAuthContext()
    const {id} = useParams()

    const [event, eventDispatch] = useState(null)
    const [editing, setEdit] = useState(false)

    const [editingTitle, setEditingTitle] = useState('')
    const [editingDescription, setEditingDescription] = useState('')
    const [editingStartDate, setEditingStartDate] = useState(new Date())
    const [editingEndDate, setEditingEndDate] = useState(new Date())

    const [fetched, changeFetch] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvents = async () => {
            const response = await fetch(`/api/events/` + id, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                eventDispatch(json)
                changeFetch(true)
            }
        }

        // if user is logged in
        if (user) {
            fetchEvents();
        }
    }, [user, id, eventDispatch, fetched])

    // delete function
    const handleDelete = async () => {
        if (!user) {
            return
        }

        // sends a delete request to database
        const response = await fetch('/api/events/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            eventDispatch({type: 'DELETE_EVENT', payload: json})
        }
        // return to events page
        navigate(-1)
    }

    // shows editing interface
    const handleShowEditInterface = async () => {
        if (!user) {
            return
        }
        setEditingTitle(event.title)
        setEditingDescription(event.description)
        setEdit(true)
    }

    // cancels edit and returns to event page
    const handleCancel = () => {
        if (!user) {
            return
        }
        setEdit(false)
    }

    // sets changes to event being edited
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!user) {
            return
        }

        const title = editingTitle
        const description = editingDescription
        const user_id = event.user_id

        const editEvent = {title, description, "startDate": editingStartDate, "endDate": editingEndDate, user_id}

        const response = await fetch('/api/events/' + id, {
            method: 'PATCH',
            body: JSON.stringify(editEvent),
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
            eventDispatch(editEvent)
            setEdit(false)
            changeFetch(false)
        }
    }

    return (
        <>
        {event && <Card style={{ width: '60rem' }}>
            <Card.Body>
                <Card.Header>{event.user_id}</Card.Header>

                <Card.Text>
                    {!editing && <Card.Body>
                        <Card.Text><h5>{event.title}</h5></Card.Text>
                        <Card.Text>{event.description}</Card.Text>
                        <Card.Text>Start Date: {new Date(event.startDate).toLocaleString()}</Card.Text>
                        <Card.Text>End Date: {new Date(event.endDate).toLocaleString()}</Card.Text>
                    </Card.Body>}  
                    {editing && <Form className="createEvent">
                        <h5>Edit Event</h5>

                        <Form.Control
                            type="text" 
                            placeholder="Title"
                            onChange = {(e) => setEditingTitle(e.target.value)}
                            value = {editingTitle} 
                        />
                        <br/>

                        <Form.Control
                            as="textarea"
                            type="text" 
                            placeholder="Description"
                            onChange = {(e) => setEditingDescription(e.target.value)}
                            value = {editingDescription} 
                        />
                        <br/>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                Start Date and Time
                            </InputGroup.Text>

                            <div><DatePicker
                                selected={editingStartDate}
                                onChange={(date) => setEditingStartDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                            /></div>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-default">
                                End Date and Time
                            </InputGroup.Text>

                            <div><DatePicker
                                selected={editingEndDate}
                                onChange={(date) => setEditingEndDate(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="time"
                                dateFormat="MMMM d, yyyy h:mm aa"
                            /></div>
                        </InputGroup>
                    </Form>}                       
                </Card.Text>

                <Card.Footer class="card-footer d-flex justify-content-between">
                        <small className="text-muted">{new Date(event.createdAt).toLocaleString()}</small>
                        {user.email == event.user_id &&<span>
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
        
        


        {/* <div>
            {!editing && event && <div className="viewForumposts">
                <div className="actions">
                </div>

                <div className="forumpostDetails">
                    <div className="heading">
                        <h6>Title: {event.title}</h6>
                        <div className="actions">
                            <span className="space"></span>
                        </div>
                    </div>

                    <p>
                        <strong>Description: </strong>
                        {event.description}
                    </p>
                    <div>
                        <strong>Start Date: </strong>
                        {event.startDate.toLocaleString()}
                        {console.log(typeof event.startDate === 'string')}
                {console.log(typeof event.endDate === 'string')}
                    </div>
                    <div>
                        <strong>End Date: </strong>
                        {event.endDate.toLocaleString()}
                    </div>
                    <p>
                        <strong>User: </strong>
                        {event.user_id}
                    </p>
                    <p>{event.createdAt}</p>

                    <button className='edit' onClick={handleShowEditInterface}>Edit</button>
                    <button className='delete' onClick={handleDelete}>Delete</button>
                </div>
            </div>} */}

            {/* if editing state is true, show editing interface */}
            {/* {editing && event && <div className="editForumposts">
                <div className="heading">
                    <h4>{event.title}</h4>

                    <form className="editEvent" onSubmit={handleSubmit}>
                        <label>Event Title</label>
                        <input
                            type = "text"
                            onChange = {(e) => setEditingTitle(e.target.value)}
                            value = {editingTitle}
                        />

                        <label>Description</label>
                        <textarea
                            type = "text"
                            onChange = {(e) => setEditingDescription(e.target.value)}
                            value = {editingDescription}
                        />

                        <label>Start Date and Time</label>

                        <span><DatePicker
                            selected={editingStartDate}
                            onChange={(date) => setEditingStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        /></span>

                        <label>End Date and Time</label>

                        <span><DatePicker
                            selected={editingEndDate}
                            onChange={(date) => setEditingEndDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            timeIntervals={15}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        /></span>

                        <button className = 'cancel' onClick={handleCancel}>Cancel</button>
                        <button>Save Changes</button>
                    </form>
                </div>
            </div>}
        </div> */}
        </>
    );
}

export default ViewEvent
