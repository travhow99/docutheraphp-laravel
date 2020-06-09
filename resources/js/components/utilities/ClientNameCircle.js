import React from 'react';


const ClientNameCircle = (props) => {
    return(
        <div className="client-name-circle" style={{background: props.randomColor}}>
            {props.name[0]}{props.name[2]}
        </div>
    )
}

export default ClientNameCircle;