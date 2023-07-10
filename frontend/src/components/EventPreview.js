import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"
import { Link } from 'react-router-dom';

const EventPreview = ({ event }) => {
    const {user} = useAuthContext()
    const { eventDispatch } = useEventContext()

    const handleDelete = async () => {
        if (!user) {
          return
        }
    
        const response = await fetch('/api/events/' + event._id, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        })
        const json = await response.json()
    
        if (response.ok) {
          eventDispatch({type: 'DELETE_EVENT', payload: json})
        }
      }

    return (
        <div className="eventPreview">
            <div className="heading">
                <h6>Title: {event.title}</h6>
                <div className="actions">
                    {/*<button className = 'edit' >Details</button>*/}
                    {/* <button className="edit"><Link to={`/events/${event._id}`}>
                        Details
                    </Link></button> */}
                    <span className="space"></span>
                    {/* <button className='delete' onClick={handleDelete}>Delete</button> */}
                </div>
            </div>

            <p>
                <strong>Description: </strong>
                {event.description}
            </p>
            <p>
                <strong>Time: </strong>
                {event.time}
            </p>
            <p>
                <strong>User: </strong>
                {event.user_id}
            </p>
            <p>{event.createdAt}</p>

            <button className='delete' onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default EventPreview;