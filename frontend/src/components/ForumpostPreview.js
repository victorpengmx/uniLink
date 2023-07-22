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
                    {/* <strong>Content: </strong> */}
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

        // <div className="forumpostDetails">
        //     <div className="heading">
        //         <h6>{forumpost.title}</h6>
        //         <div className="actions">
        //             {/*<button className = 'edit' >Details</button>*/}
        //             <button className="edit"><Link to={`/viewforumposts/${forumpost._id}`}>
        //                 Details
        //             </Link></button>
        //             <span className="space"></span>
        //             {/* <button className='delete' onClick={handleDelete}>Delete</button> */}
        //         </div>
        //     </div>

        //     <p>
        //         <strong>Content: </strong>
        //         {forumpost.content}
        //     </p>
        //     <p>
        //         <strong>User: </strong>
        //         {forumpost.user_id}
        //     </p>
        //     <p>{new Date(forumpost.createdAt).toLocaleString()}</p>
        // </div>
    );
};

export default ForumpostPreview;
