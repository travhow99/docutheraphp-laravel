import React from 'react';
import { FaEye, FaPlus, FaTrash } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';

const CrudTableButton = (props) => {
    switch (props.type) {
        case 'add':
            return <FaPlus />
        case 'view':
            return <FaEye />
        case 'edit':
            return <BsPencil />
        case 'delete':
            return <FaTrash />
        case 'default':
        default:
            return <GoGear />
    }
}

export default CrudTableButton;