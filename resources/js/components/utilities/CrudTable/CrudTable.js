import React from "react";
import { FaEye, FaTrash } from "react-icons/fa";
import { Button, Table } from "reactstrap";


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
                    {/* {props.actions.length >= 0 && <th />} */}
                </tr>
            </thead>
            <tbody>
                {props.items && props.items.map((item, index) => (
                    <tr key={index}>
                        {props.keys.map((key, k_index) => (
                            <td key={k_index}>{item[key]}{console.log(item, key)}</td>
                        ))}

                        {/* {props.actions.length >= 0 && */}
                            <td className="flex-end">
                                <div>
                                    {props.create &&
                                        <Button className="mr-2" color="success" onClick={props.create}>
                                            <FaEye />
                                        </Button>
                                    }                                   
                                    {props.view &&
                                        <Button className="mr-2" color="success" onClick={props.view}>
                                            <FaEye />
                                        </Button>
                                    }
                                    {props.delete &&
                                        <Button className="mr-2" color="danger" onClick={props.view}>
                                                <FaTrash />
                                        </Button>
                                    }
                                </div>
                            </td>
                        {/* } */}
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default CrudTable;