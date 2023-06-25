import React from 'react';
import { Link } from 'react-router-dom';

const ForumpostPreview = ({ forumpost }) => {
    return (
        <div className="forumpostDetails">
            <div className="heading">
                <h4>{forumpost.title}</h4>
                <div className="actions">
                    {/*<button className = 'edit' >Details</button>*/}
                    <button className="edit"><Link to={`/viewforumposts/${forumpost._id}`}>
                        Details
                    </Link></button>
                    <span className="space"></span>
                    {/* <button className='delete' onClick={handleDelete}>Delete</button> */}
                </div>
            </div>

            <p>
                <strong>Content: </strong>
                {forumpost.content}
            </p>
            <p>
                <strong>User: </strong>
                {forumpost.user_id}
            </p>
            <p>{forumpost.createdAt}</p>
        </div>
    );
};

export default ForumpostPreview;
