import React from 'react';
import { GoGear } from 'react-icons/go';
import { Link } from 'react-router-dom';

const ListItem = (props) => {
    return(
        <div className="flex-grow-1">
            <div className="d-flex p-2">
                <div className="flex-grow-1">
                    {props.goal.goal}
                </div>
                <div>
                    <Link to={`/clients//goals/${props.goal.id}`} />
                    <GoGear className="c-pointer" />
                </div>
            </div>
        </div>
    )
}

export default ListItem;