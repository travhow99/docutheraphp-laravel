import React from 'react';
import { Button } from 'reactstrap';
import { BsPencil } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import { generateColor, generateUrl, getDataAttribute } from './functions';
import CrudTableButton from './CrudTableButton';

const CrudTableAction = (props) => {

    const view = () => {

    }

    const generateOnClick = () => {
        switch (props.action.action) {
            case 'post':
                postPrompt();
                break;
            case 'delete':
                deletePrompt();
                break;
            default:
                break;
        }
    }

    const buildPostData = (targets, data) => {
        console.log(targets, data);
        const obj = {};

        targets.forEach((d) => {
            obj[d] = getDataAttribute(d, data);
        });

        return obj;
    }

    const postPrompt = () => {
        if (!props.no_alert) {
            confirmAlert({
                title: 'Add this item?',
                message: props.action.text || 'You can change this at any time.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => postAction(),
                    },
                    {
                        label: 'No',
                    },
                ],
            });
        } else {
            postAction();
        }
    }

    /**
     * @todo return newly created resource
     */
    const postAction = () => {
        let url = generateUrl(props.action.url, props.action.data, props.data);

        // let id = getDataAttribute(props.action.post[0], props.data);

        const data = buildPostData(props.action.post, props.data);

        axios.post(url, data)
            .then((json) => {
                console.log('ret', json);
                
                if (json.status === 201) {
                    console.log('success');

                    props.action.callback(json.data);
                }
            })
            .catch((err) => console.log(err))
    }

    const deletePrompt = () => {
        if (!props.no_alert) {
            confirmAlert({
                title: 'Delete this item?',
                message: 'This cannot be undone!',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => deleteAction(),
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
        let url = generateUrl(props.action.url, props.action.data, props.data);

        let id = getDataAttribute(props.action.data.pop(), props.data);

        axios.delete(url)
            .then((json) => {
                if (json.status === 200) {
                    console.log('success');

                    props.action.callback(id);
                }
            })
            .catch((err) => console.log(err))
    }

    if (props.action.action === 'link') {
        return (
            <Link style={{ color: "white" }} to={generateUrl(props.action.url, props.action.data, props.data)}>
                <Button className="mr-2" color={generateColor(props.action.type)} /* onClick={props.action.callback()} */ >
                    <CrudTableButton type={props.action.type} />
                </Button>
            </Link>
        )
    } else {
        return (
            <Button className="mr-2" color={generateColor(props.action.type)} onClick={generateOnClick} >
                <CrudTableButton type={props.action.type} />
            </Button>
        )
    }
}

export default CrudTableAction;