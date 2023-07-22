import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const EventForm = () => {
    const { eventDispatch } = useEventContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleSubmit = async (e) => {
        // prevents page from refreshing
        e.preventDefault()

        // checks if user is logged in
        if (!user) {
            setError('You are not logged in')
            return
        }

        const event = {title, description, startDate, endDate, "user_id": user.email}

        const response = await fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        // newly added event
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setTitle('')
            setDescription('')

            eventDispatch({type: 'CREATE_EVENT', payload: json})

            setError(null)
            console.log(user.email)
            console.log('new event created', json)
        }
    }

    return (
        <Form className="createEvent">
            <h3>New Event</h3>

            <Form.Control
                type="text" 
                placeholder="Title"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title} 
            />

            <br/>

            <Form.Control
                as="textarea"
                type="text" 
                placeholder="Description"
                onChange = {(e) => setDescription(e.target.value)}
                value = {description} 
            />

            <br/>

            <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                    Start Date and Time
                </InputGroup.Text>

                <div><DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
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
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                /></div>
            </InputGroup>

            <Button size="sm" className="m-2" onClick={handleSubmit}>Create Event</Button>

            {error && <div className="error">{error}</div>}
        </Form>
    )
}

export default EventForm