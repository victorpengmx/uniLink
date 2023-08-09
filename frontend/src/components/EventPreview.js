import React from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useEventContext } from "../hooks/useEventContext"
import { useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
            </Card>
            <br/>
        </>
    );
};

export default EventPreview;