import React, { Component, useState } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import { GoThreeBars, GoDashboard } from 'react-icons/go';

const Sidebar = (props) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showDashboard, setshowDashboard] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return(
        <div>
            <div id="sidebarContainer" className={isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}>
                <ul className="list-group">
                    {/* <!-- Separator with title --> */}
                    <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center justify-content-flex-start menu-collapsed">
                        <GoThreeBars onClick={toggle} />
                        {isOpen && <small>MAIN MENU</small>}
                    </li>

                    <Collapse isOpen={showDashboard}>
                        <div className="d-flex w-100 justify-content-start align-items-center text-white">
                            <GoDashboard className="mr-3 fa-fw" />
                            {isOpen && (
                                <React.Fragment>
                                    <span className="menu-collapsed">Dashboard</span>
                                    <span className="submenu-icon ml-auto"></span>
                                </React.Fragment>
                            )}
                        </div>

                            <Link to="/clients">Client</Link>
                            <Link to="/clients">Sessions</Link>
                            <Link to="/clients">Goals</Link>
                    </Collapse>

                </ul>
            </div>
        </div>
    )
}

export default Sidebar;