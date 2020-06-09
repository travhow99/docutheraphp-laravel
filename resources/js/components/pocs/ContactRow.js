import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaTimes } from 'react-icons/fa';
import { Input, Button } from 'reactstrap';
import { useAlert } from 'react-alert';

const ContactRow = (props) => {
    const [expanded, setExpanded] = useState(false);

    console.log(props);

    const update = (e) => {
        e.preventDefault();

        const {name, value} = e.target;
        console.log(props.poc[name]);

        if (props.poc[name] === value) return;

        props.updateContact(props.index, props.poc.id, {name, value});
        // setExpanded(false);
    }

    return(
        <React.Fragment>
            {!expanded ? 
                <tr>
                    <td>{props.poc.contact_name}</td>
                    <td>{props.poc.email}</td>
                    <td>{props.poc.phone_number}</td>
                    <td className="text-right">
                        <BsThreeDotsVertical className="c-pointer" onClick={()=>setExpanded(true)} />
                    </td>
                </tr>
                :
                <React.Fragment>
                    <tr>
                        <td>
                            <Input type="text" onBlur={update} name="contact_name" defaultValue={props.poc.contact_name} />
                        </td>
                        <td>
                            <Input type="text" onBlur={update} name="email" defaultValue={props.poc.email} />
                        </td>
                        <td>
                            <Input type="text" onBlur={update} name="phone_number" defaultValue={props.poc.phone_number} />
                        </td>
                        <td className="text-right">
                            <FaTimes className="c-pointer" onClick={()=>setExpanded(false)} />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="4">
                            <Button color="danger">Delete</Button>
                        </td>
                    </tr>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default ContactRow;