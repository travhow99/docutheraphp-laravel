import React from 'react';
import { Button } from 'reactstrap';
import { BsPencil } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';

const CrudTableAction = (props) => {
    const generateColor = () => {
        let color;

        switch(props.action.type) {
            case 'view':
                color = 'primary';
                break;
            case 'edit':
                color = 'success';
                break;
            case 'delete':
                color = 'danger';
                break;
            default:
                color = 'primary';
                break;
        }

        return color;
    }

    return (
        <Button className="mr-2" color={generateColor()} >
            {console.log(props.action.type)}
            {props.action.type === 'view' && <FaEye />}
            {props.action.type === 'edit' && <BsPencil />}
            {props.action.type === 'delete' && <FaTrash />}
            {props.action.type === 'default' && <GoGear />}
        </Button>
    )
}

export default CrudTableAction;