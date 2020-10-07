import React from 'react';
import { FaUserAlt, FaCalendarDay } from 'react-icons/fa';
import { GrNotes, GrDocumentText } from 'react-icons/gr';
import { AiOutlineRise } from 'react-icons/ai';
import { MdDashboard } from 'react-icons/md';
import ClientLink from './ClientLink';
import ClientLinkDisabled from './ClientLinkDisabled';


const ClientSidebar = (props) => {
    let links = [
        {
            page: 'Overview',
            icon: <MdDashboard className="mr-3 fa-fw" />,
            to: `/clients/${props.id}`,
            slug: undefined,
            disabled: false,
        },
        {
            page: 'Client Details',
            icon: <FaUserAlt className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/details`,
            slug: 'details',
            disabled: false,
        },
        {
            page: 'Goals',
            icon: <AiOutlineRise className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/goals`,
            slug: 'goals',
            disabled: false,
        },
        {
            page: 'Sessions',
            icon: <FaCalendarDay className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/sessions`,
            slug: 'sessions',
            disabled: false,
        },
        {
            page: 'Forms & Documentation',
            icon: <GrDocumentText className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/forms`,
            slug: 'forms',
            disabled: false,
        },
        {
            page: 'Notes',
            icon: <GrNotes className="mr-3 fa-fw" />,
            to: `/clients/${props.id}/notes`,
            slug: 'notes',
            disabled: false,
        },
    ];


    links.map((link) => {
        if (props.exclude.indexOf(link.page) >= 0) {
            link.disabled = true;
        }
    });

    return(
        <div id="clientSidebar" className="w-100">
            <ul className="list-group">
                {links.map((link, key) => (
                    link.disabled ? (
                        <ClientLinkDisabled 
                            key={key}
                            active={props.active === link.slug}
                            page={link.page}
                            icon={link.icon}
                            disabled={true}
                        />
                    ) : (
                        <ClientLink
                            key={key}
                            action={() => {
                                props.setActive(link.slug)
                            }}
                            active={props.active === link.slug}
                            page={link.page}
                            icon={link.icon}
                            to={link.to}
                            disabled={link.disabled}
                        />
                    )
                ))}
            </ul>
        </div>
    )
}

export default ClientSidebar;