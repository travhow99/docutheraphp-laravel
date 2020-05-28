import React, { useState } from 'react';
import { GoThreeBars, GoDashboard } from 'react-icons/go';
import { FaUserAlt, FaCalendarDay } from 'react-icons/fa';
import { GrNotes, GrDocumentText } from 'react-icons/gr';
import { MdDashboard } from 'react-icons/md';
import { TiDocumentAdd } from 'react-icons/ti';
import ClientLink from './ClientLink';


const ClientSidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDashboard, setshowDashboard] = useState(false);
    const [active, setActive] = useState('Overview');

    const links = [
        {
            page: 'Overview',
            icon: <MdDashboard className="mr-3 fa-fw" />,
            to: '/',
        },
        {
            page: 'Client Details',
            icon: <FaUserAlt className="mr-3 fa-fw" />,
            to: '/clients',
        },
        {
            page: 'Sessions',
            icon: <FaCalendarDay className="mr-3 fa-fw" />,
            to: '/clients',
        },
        {
            page: 'Forms & Documentation',
            icon: <GrDocumentText className="mr-3 fa-fw" />,
            to: '/documentation',
        },
        {
            page: 'Notes',
            icon: <GrNotes className="mr-3 fa-fw" />,
            to: '/documentation',
        },
    ];

    return(
        <div id="clientSidebar" className="w-100">
            <ul className="list-group">
                {links.map((link, key) => (
                    <ClientLink
                        key={key}
                        active={active === link.page}
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