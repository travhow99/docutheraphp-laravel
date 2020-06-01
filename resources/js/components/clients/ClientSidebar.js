import React, { useState } from 'react';
import { FaUserAlt, FaCalendarDay } from 'react-icons/fa';
import { GrNotes, GrDocumentText } from 'react-icons/gr';
import { AiOutlineRise } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import ClientLink from './ClientLink';
import { useParams } from 'react-router-dom';


const ClientSidebar = (props) => {
    console.log('pPPDFLKDJF',props);
    console.log(useParams());
    // const [active, setActive] = useState('Overview');

    console.log('sidebar:',props);
    const links = [
        {
            page: 'Overview',
            icon: <MdDashboard className="mr-3 fa-fw" />,
            to: `/clients/${props.id}`,
            slug: undefined,
        },
        {
            page: 'Client Details',
            icon: <FaUserAlt className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/details`,
            slug: 'details',
        },
        {
            page: 'Goals',
            icon: <AiOutlineRise className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/goals`,
            slug: 'goals',
        },
        {
            page: 'Sessions',
            icon: <FaCalendarDay className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/sessions`,
            slug: 'sessions',
        },
        {
            page: 'Forms & Documentation',
            icon: <GrDocumentText className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/forms`,
            slug: 'forms',
        },
        {
            page: 'Notes',
            icon: <GrNotes className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/notes`,
            slug: 'notes',
        },
    ];

    return(
        <div id="clientSidebar" className="w-100">
            <ul className="list-group">
                {links.map((link, key) => (
                    <ClientLink
                        key={key}
                        action={() => {
                            props.setActive(link.slug)
                        }}
                        active={props.active === link.slug}
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