import React from 'react';
import { Button } from "reactstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import CrudTableAction from './CrudTableAction';
import CrudTableCell from './CrudTableCell';

const CrudTableRow = (props) => {


    // const text = props.function ? props.function() : props.

    console.log('c row', props);

    const getDataElements = (item) => {
        const data = {};

        Object.keys(item).map((key, k_index) => {
            if (key.indexOf('data-') === 0) data[key] = props.item[key];
        });

        return data;
    }

    return (
        <tr {...getDataElements(props.item)}>
            {Object.keys(props.item).map((key, k_index) => (
                <CrudTableCell key={k_index} field={key} val={props.item[key]} />
            ))}

            <td className="flex-end">
                <div>
                    {props.actions.map((action, index) => (
                        <CrudTableAction key={index} action={action} data={getDataElements(props.item)} />
                    ))}
                </div>
            </td>
        </tr>
    )
}

export default CrudTableRow;