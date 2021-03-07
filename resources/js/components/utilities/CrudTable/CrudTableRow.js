import React from 'react';
import { Button } from "reactstrap";
import { FaEye, FaTrash } from "react-icons/fa";
import CrudTableAction from './CrudTableAction';
import CrudTableCell from './CrudTableCell';

const CrudTableRow = (props) => {


    // const text = props.function ? props.function() : props.

    console.log('c row', props);

    const getItem = (key) => {
        let build = '';

        if (key.pre) build += key.pre;

        if (key.key.indexOf('.') >= 0) {
            const find = key.key.split('.');

            console.log(find);
            build += props.item[find[0]][find[1]];
        } else if (key.function) {
            console.log('func:', key, key.function);
            // console.log('func:', key.function());
        } else {
            build += props.item[key.key];
        }

        return build;
    }


    return (
        <tr>
            {/* props.headers.map((key, index) => (
                <td key={index}>
                    {props.item[key]}
                </td>
            )) */}
            {Object.keys(props.item).map((key, k_index) => (
                <CrudTableCell key={k_index} field={key} val={props.item[key]} />
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