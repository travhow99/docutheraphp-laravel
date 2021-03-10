import React from 'react';
import { Button } from 'reactstrap';
import { BsPencil } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';

const CrudTableAction = (props) => {
    const generateColor = () => {
        let color;

        switch (props.action.type) {
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

    const generateUrl = () => {
        let url = props.action.url;

        props.action.data.forEach((d, index) => {
            url = url.replace(`$${index + 1}`, getDataAttribute(d));
        });

        return url;
    }

    const generateOnClick = () => {
        switch (props.action.action) {
            case 'delete':
                deletePrompt();
                break;
            default:
                break;
        }
    }

    const deletePrompt = () => {
        if (!props.no_alert) {
            confirmAlert({
                title: 'Delete this item?',
                message: 'This cannot be undone!',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteAction()
                    },
                    {
                        label: 'No',
                    },
                ],
            });
        } else {
            deleteAction();
        }

    }

    const deleteAction = () => {
        let url = generateUrl();

        let id = getDataAttribute(props.action.data.pop());

        axios.delete(url)
            .then((res) => res)
            .then((json) => {
                if (json.status === 200) {
                    console.log('success');

                    props.action.delete(id);
                    // props.update()

                    /* let newPocs = [...props.pocs];
                    newPocs.splice(index, 1);
                    
                    props.updatePocs(newPocs); */
                }
            })
            .catch((err) => console.log(err))

    }

    const getDataAttribute = (attr) => {
        // return attr.replace('data-', '');
        return props.data[`data-${attr}`];
    }

    if (props.action.action === 'link') {
        return (
            <Button className="mr-2" color={generateColor()} /* onClick={props.action.callback()} */ >
                <Link style={{ color: "white" }} to={generateUrl}>
                    {props.action.type === 'view' && <FaEye />}
                    {props.action.type === 'edit' && <BsPencil />}
                    {props.action.type === 'delete' && <FaTrash />}
                    {props.action.type === 'default' && <GoGear />}
                </Link>
            </Button>
        )
    } else {
        return (
            <Button className="mr-2" color={generateColor()} onClick={generateOnClick} >
                {props.action.type === 'view' && <FaEye />}
                {props.action.type === 'edit' && <BsPencil />}
                {props.action.type === 'delete' && <FaTrash />}
                {props.action.type === 'default' && <GoGear />}
            </Button>
        )
    }
}

export default CrudTableAction;

module.exports = { generateUrl };