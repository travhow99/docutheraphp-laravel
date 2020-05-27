import React from 'react';
import { Card } from 'reactstrap';
import ClientNameCircle from '../utilities/ClientNameCircle';

const ClientInfo = (props) => {
    console.log(props);
    return (
        <div className="h-100 w-100 border-right position-relative">
            <div className="client-header">
                <div className="client-header-top">

                </div>
                <ClientNameCircle name={props.client.name} />
                <div className="client-header-bottom">
                    <div className="d-flex flex-column justify-content-end">
                        <div className="p-2">
                            {props.poc.length ? (
                                <h3>{props.poc.name}</h3>
                            ) : (
                                    <h3>Add POC</h3>
                                )}
                            {props.client &&
                                <div>
                                    <div>{props.client.session_day}</div>
                                    <div>{props.client.session_time}</div>
                                </div>
                            }
                        </div>
                        <div>
                            <ul>
                                <li>Overview</li>
                                <li>Client Detials</li>
                                <li>Sessions</li>
                                <li>Forms & Documentation</li>
                                <li>Notes</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientInfo;