import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

const SidebarLink = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <React.Fragment>
            <div onClick={toggle} className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-start align-items-center text-dark">
                    {props.icon}
                    {props.expanded && (
                        <React.Fragment>
                            <span className="menu-collapsed">{props.page}</span>
                            <span className="submenu-icon ml-auto"></span>
                        </React.Fragment>
                    )}
                </div>
            </div>
            <Collapse isOpen={isOpen} className="sidebar-menu">
                {props.subs.map((sub, key) => (
                    <Link key={key} to={sub.link}>
                        {sub.name}
                    </Link>
                ))}
            </Collapse>
        </React.Fragment>
    )
}

export default SidebarLink;