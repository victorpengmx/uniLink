import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ForumpostPreview = ({ forumpost }) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/viewforumposts/${forumpost._id}`)
    }

    return (
        <>
            <Card style={{ width: '60rem' }}>
                <Card.Body>
                    <Card.Header>{forumpost.user_id}</Card.Header>
                    <Card.Text>
                        <h5>{forumpost.title}</h5>
                    </Card.Text>
                    <Card.Text>
                        {forumpost.content}
                    </Card.Text>
                    <Card.Footer class="card-footer d-flex justify-content-between">
                        <small className="text-muted">{new Date(forumpost.createdAt).toLocaleString()}</small>
                        <Button size="sm" onClick={handleNavigate}>Details</Button>
                    </Card.Footer>
                </Card.Body>

            </Card>
            <br/>
        </>
    );
};

export default ForumpostPreview;
