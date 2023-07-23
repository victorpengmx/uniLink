import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const EventPreview = ({ event }) => {
    const navigate = useNavigate()

    const {user} = useAuthContext()
    const { eventDispatch } = useEventContext()

    const handleNavigate = () => {
        navigate(`/events/${event._id}`)
    }

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
        <>
        <Card style={{ width: '60rem' }}>
            <Card.Body>
                <Card.Header>{event.user_id}</Card.Header>
                <Card.Text><h4><strong>{event.title}</strong></h4></Card.Text>
                {/* <Card.Text><strong>Description</strong></Card.Text> */}
                <Card.Text>{event.description}</Card.Text>
            </Card.Body>
            <Card.Body>
                <Card.Text>Start Date: {new Date(event.startDate).toLocaleString()}</Card.Text>
                <Card.Text>End Date: {new Date(event.endDate).toLocaleString()}</Card.Text>
            </Card.Body>
            <Card.Footer class="card-footer d-flex justify-content-between">
                <small className="text-muted">{new Date(event.createdAt).toLocaleString()}</small>
                <Button size="sm" onClick={handleNavigate}>
                    Details
                </Button>
            </Card.Footer>
        {/* <div className="forumpostDetails">
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
        </div> */}
            
        </Card>
        <br/>
        </>
    );
};

export default EventPreview;