import React from 'react';
import { Button } from "reactstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import CrudTableAction from './CrudTableAction';

const CrudTableRow = (props) => {


    // const text = props.function ? props.function() : props.

    console.log(props.actions);

    return (
        <tr>
            {props.keys.map((key, k_index) => (
                <td key={k_index}>
                    {key.pre && key.pre}
                    {props.item[key.key]}
                </td>
            ))}

            <td className="flex-end">
                <div>
                    {props.actions.map((action, index) => (
                        <CrudTableAction key={index} action={action} />
                    ))}
                </div>
            </td>
        </tr>
    )
}

export default CrudTableRow;