import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GoThreeBars, GoDashboard } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { TiDocumentAdd } from 'react-icons/ti';
import SidebarLink from './SidebarLink';

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showDashboard, setshowDashboard] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const links = [
        {
            page: 'Dashboard',
            icon: <GoDashboard className="mr-3 fa-fw" />,
            subs: [
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
            ],
        },
        {
            page: 'Clients',
            icon: <FaUsers className="mr-3 fa-fw" />,
            subs: [
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
            ],
        },
        {
            page: 'Documentation',
            icon: <TiDocumentAdd className="mr-3 fa-fw" />,
            subs: [
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
            ],
        },
    ]

    return(
        <div>
            <div id="sidebarContainer" className={isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}>
                <ul className="list-group">
                    {/* <!-- Separator with title --> */}
                    <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center justify-content-flex-start menu-collapsed">
                        <GoThreeBars onClick={toggle} />
                        {isOpen && <small>MAIN MENU</small>}
                    </li>

                    {links.map((link, key) => (
                        <SidebarLink
                            key={key}
                            expanded={isOpen}
                            page={link.page}
                            icon={link.icon}
                            subs={link.subs}
                        />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;