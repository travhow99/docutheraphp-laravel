import React, { useState } from 'react';
import { GoThreeBars, GoDashboard } from 'react-icons/go';
import { FaUserAlt, FaCalendarDay } from 'react-icons/fa';
import { GrNotes, GrDocumentText } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';
import { TiDocumentAdd } from 'react-icons/ti';
import ClientLink from './ClientLink';


const ClientSidebar = (props) => {
    // const [active, setActive] = useState('Overview');

    console.log('sidebar:',props);
    const links = [
        {
            page: 'Overview',
            icon: <MdDashboard className="mr-3 fa-fw" />,
            to: `/clients/${props.id}`,
        },
        {
            page: 'Client Details',
            icon: <FaUserAlt className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/details`,
        },
        {
            page: 'Sessions',
            icon: <FaCalendarDay className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/sessions`,
        },
        {
            page: 'Forms & Documentation',
            icon: <GrDocumentText className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/forms`,
        },
        {
            page: 'Notes',
            icon: <GrNotes className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/notes`,
        },
    ];

    return(
        <div id="clientSidebar" className="w-100">
            <ul className="list-group">
                {links.map((link, key) => (
                    <ClientLink
                        key={key}
                        onClick={() => {
                            console.log('NEW:',link.page);
                            props.setActive(link.page)
                        }}
                        active={props.active === link.page}
                        page={link.page}
                        icon={link.icon}
                        to={link.to}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ClientSidebar;