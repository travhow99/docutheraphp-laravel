import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Button, Table } from "reactstrap";
import CrudTableRow from "./CrudTableRow";


const CrudTable = (props) => {
    console.log('props:', props);


    return (
        <Table>
            <thead>
                <tr>
                    {props.headers.length && props.headers.map((head, index) => (
                        <th
                            key={index}
                            width={head.width || 'auto'}
                        >
                            {head.title}
                        </th>
                    ))}
                    {props.actions.length >= 0 && <th />}
                </tr>
            </thead>
            <tbody>
                {props.data.length >= 0 && props.data.map((item, index) => (
                    <CrudTableRow key={index} item={item} actions={props.actions} headers={props.headers} />
                ))}
            </tbody>
        </Table>
    )
}

export default CrudTable;