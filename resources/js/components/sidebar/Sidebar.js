import React, { useState } from 'react';
import { GoThreeBars, GoDashboard } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { TiDocumentAdd } from 'react-icons/ti';
import SidebarLink from './SidebarLink';

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showDashboard, setshowDashboard] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const links = [
        {
            page: 'Dashboard',
            icon: <GoDashboard className={!isOpen ? "fa-fw" : "mr-3 fa-fw"} />,
            to: '/',
            /* subs: [
                {
                    link: '/clients',
                    name: 'Client',
                },
                {
                    link: '/clients',
                    name: 'Sessions',
                },
                {
                    link: '/clients',
                    name: 'Goals',
                },
            ], */
        },
        {
            page: 'Clients',
            icon: <FaUsers className={!isOpen ? "fa-fw" : "mr-3 fa-fw"} />,
            to: '/clients',
            /* subs: [
                {
                    link: '/clients',
                    name: 'Client',
                },
                {
                    link: '/clients',
                    name: 'Sessions',
                },
                {
                    link: '/clients',
                    name: 'Goals',
                },
            ], */
        },
        {
            page: 'Documentation',
            icon: <TiDocumentAdd className={!isOpen ? "fa-fw" : "mr-3 fa-fw"} />,
            to: '/documentation',
            /* subs: [
                {
                    link: '/clients',
                    name: 'Client',
                },
                {
                    link: '/clients',
                    name: 'Sessions',
                },
                {
                    link: '/clients',
                    name: 'Goals',
                },
            ], */
        },
    ]

    return(
        <div id="sidebarContainer" className={isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}>
            <ul className="list-group">
                {links.map((link, key) => (
                    <SidebarLink
                        key={key}
                        expanded={isOpen}
                        page={link.page}
                        icon={link.icon}
                        subs={link.subs}
                        to={link.to}
                    />
                ))}
            </ul>
        </div>
    )
}

export default Sidebar;