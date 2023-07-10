import { useEffect } from 'react'
import { useEventContext } from '../hooks/useEventContext'
import { useAuthContext } from '../hooks/useAuthContext'

import EventForm from '../components/EventForm'
import EventPreview from '../components/EventPreview'

const EventsPage = () => {
    const {events, eventDispatch} = useEventContext()
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchEvents = async () => {
            // Fetch all forum posts from the API
            const response = await fetch("/api/events", {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const json = await response.json();

            if (response.ok) {
                eventDispatch({ type: "SET_EVENTS", payload: json });
            }
        };

        if (user) {
            fetchEvents();
        }
    }, [eventDispatch, user]);
    
    return (
        <>
            <EventForm />

            <div className="events">
                {events &&
                    events.map((event) => (
                        <div className="eventPreview" key={event._id}>
                            <EventPreview event={event} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default EventsPage