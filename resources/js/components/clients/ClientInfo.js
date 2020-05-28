import React from 'react';
import ClientSidebar from './ClientSidebar';
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
                    <div className="d-flex flex-column">
                        <div className="w-100 py-4 px-2 text-right border-bottom">
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
                            <ClientSidebar />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClientInfo;