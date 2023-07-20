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
        <div className="forumpostDetails">
            {/* {console.log((typeof event.startDate === 'string'))} */}
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
                <strong>Start Date: </strong>
                {new Date(event.startDate).toLocaleString()}
            </p>
            <p>
                <strong>End Date: </strong>
                {new Date(event.endDate).toLocaleString()}
            </p>
            <p>
                <strong>User: </strong>
                {event.user_id}
            </p>
            <p>{new Date(event.createdAt).toLocaleString()}</p>

            <button className='delete' onClick={handleDelete}>Delete</button>

            <button className="edit"><Link to={`/events/${event._id}`} id={event._id}>
                Details
            </Link></button>
        </div>
    );
};

export default EventPreview;