import React from 'react';
import { getRandomColor } from '../helpers/functions';


const ClientNameCircle = (props) => {
    return(
        <div className="client-name-circle" style={{background: getRandomColor()}}>
            {props.name[0]}{props.name[2]}
        </div>
    )
}

export default ClientNameCircle;