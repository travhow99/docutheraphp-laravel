import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientLink = (props) => {
    return (
        <Link to={props.to} className="flex-column align-items-start">
            <div className={`d-flex align-items-center justify-content-start text-dark w-100 p-3 border-bottom ${props.active ? 'client-link-active' : ''}`}>
                {props.icon}
                <div>{props.page}</div>
            </div>
        </Link>
    )
}

export default ClientLink;