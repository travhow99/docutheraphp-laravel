import React from 'react';
import { Button } from 'reactstrap';
import { BsPencil } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { Link } from 'react-router-dom';

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

    const view = () => {

    }

    const generateLink = () => {
        let url = props.action.url;

        props.action.data.forEach((d, index) => {
            url = url.replace(`$${index + 1}`, getDataAttribute(d));
        });

        return url;
    }

    const getDataAttribute = (attr) => {
        // return attr.replace('data-', '');
        return props.data[`data-${attr}`];
    }

    console.log('action p', props);

    if (props.action.action === 'link') {
        return (
            <Link to={generateLink}>
                {props.action.type === 'view' && <FaEye />}
                {props.action.type === 'edit' && <BsPencil />}
                {props.action.type === 'delete' && <FaTrash />}
                {props.action.type === 'default' && <GoGear />}
            </Link>
        )
    } else {
        return (
            <Button className="mr-2" color={generateColor()} /* onClick={props.action.callback()} */ >
                {console.log(props.action.type, props.data)}
                {props.action.type === 'view' && <FaEye />}
                {props.action.type === 'edit' && <BsPencil />}
                {props.action.type === 'delete' && <FaTrash />}
                {props.action.type === 'default' && <GoGear />}
            </Button>
        )
    }
}

export default CrudTableAction;