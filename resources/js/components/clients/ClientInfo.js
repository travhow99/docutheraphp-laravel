import React from 'react';
import { Card } from 'reactstrap';
import ClientNameCircle from '../utilities/ClientNameCircle';

const ClientInfo = (props) => {
    return(
        <div className="h-100 border-right position-relative">
            <div className="client-header">
                <div className="client-header-top">
                    
                </div>
                <ClientNameCircle name={props.client.name} />
                <div className="client-header-bottom">
                    BOTTOM
                </div>
            </div>
        </div>
    )
}

export default ClientInfo;