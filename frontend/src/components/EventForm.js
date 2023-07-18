import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
        <form className="createEvent" onSubmit={handleSubmit}>
            <h3>Create a new event</h3>

            <label>Event Title</label>
            <input
                type = "text"
                onChange = {(e) => setTitle(e.target.value)}
                value = {title}
            />
            
            <label>Description:</label>
            <textarea
                type = "text"
                onChange = {(e) => setDescription(e.target.value)}
                value = {description}
            />

            <label>Start Date and Time:</label>

            <p><DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
            /></p>

            <label>End Date and Time:</label>

            <p><DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
            /></p>

            <button onClick={console.log(startDate.toLocaleString())}>Create event</button>

            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default EventForm