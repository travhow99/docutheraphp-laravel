import React from 'react';
import { Card } from 'reactstrap';
import ClientNameCircle from '../utilities/ClientNameCircle';

const ClientInfo = (props) => {
    console.log(props);
    return(
        <div className="h-100 w-100 border-right position-relative">
            <div className="client-header">
                <div className="client-header-top">
                    
                </div>
                <ClientNameCircle name={props.client.name} />
                <div className="client-header-bottom">
                    <div className="d-flex justify-content-end">
                        {props.poc.length ? (
                            <h3>{props.poc.name}</h3>
                        ) : (
                            <div>
                                <h3>Add POC</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientInfo;