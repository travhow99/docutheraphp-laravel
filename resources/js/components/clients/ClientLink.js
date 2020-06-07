import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientLink = (props) => {
    console.log('disabled?',props.disabled);
    return (
        <Link to={props.to} onClick={props.action} className="client-link" disabled={props.disabled}>
            <div className={`d-flex align-items-center justify-content-start text-dark w-100 p-3 border-bottom ${props.active ? 'client-link-active' : ''}`}>
                {props.icon}
                <div>{props.page}</div>
            </div>
        </Link>
    )
}

export default ClientLink;