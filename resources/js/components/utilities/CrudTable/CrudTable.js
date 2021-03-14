import React from "react";
import { Table } from "reactstrap";
import CrudTableRow from "./CrudTableRow";


const CrudTable = (props) => {
    console.log('props:', props);

    const actions = props.actions || [];


    return (
        <React.Fragment>
            {props.title && <h5>{props.title}</h5>}
            {props.data && props.data.length > 0
                ?
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
                            {actions.length >= 0 && <th />}
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.map((item, index) => (
                            <CrudTableRow key={index} item={item} actions={actions} headers={props.headers} />
                        ))}
                    </tbody>
                </Table>
                :
                <p>
                    No {props.title || 'items'} exist yet!
                </p>
            }
        </React.Fragment>
    )
}

export default CrudTable;