import React from 'react';

const ClientLinkDisabled = (props) => {
    console.log('disabled?',props.disabled);
    return (
        <div className="client-link client-link-disabled" disabled={props.disabled}>
            <div className={`d-flex align-items-center justify-content-start w-100 p-3 border-bottom ${props.active ? 'client-link-active' : ''}`}>
                {props.icon}
                <div>{props.page}</div>
            </div>
        </div>
    )
}

export default ClientLinkDisabled;