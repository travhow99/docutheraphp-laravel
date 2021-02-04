import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Button, Table } from "reactstrap";
import CrudTableRow from "./CrudTableRow";


const CrudTable = (props) => {

    return (
        <Table>
            <thead>
                <tr>
                    {props.headers && props.headers.map((head, index) => (
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
                {props.items.map((item, index) => (
                    <CrudTableRow key={index} keys={props.keys} item={item} actions={props.actions} />
                ))}
            </tbody>
        </Table>
    )
}

export default CrudTable;