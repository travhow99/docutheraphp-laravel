import React, { useState, useRef, useEffect } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

const DropdownMenu = (props) => {
    const [expanded, setExpanded] = useState(false);

    const node = useRef();

    /**
     * Capture outside click of target via useRef()
     * @param {*} e event
     */
    const handleClickOutside = (e) => {
        if (node.current.contains(e.target)) {
            // inside click
            return;
        }
        // outside click
        setExpanded(false);
    };

    useEffect(() => {
        if (expanded) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [expanded]);


    return (
        <div ref={node}>
            <BsThreeDotsVertical className="c-pointer" onClick={() => setExpanded(!expanded)} />

            <div className="th-dropdown-menu" data-expanded={expanded} onBlur={() => setExpanded(false)}>
                {props.items.length && (
                    props.items.map((p, index) => (
                        <div className="th-dropdown-menu-item" key={index} onClick={() => p.onClick()}>{p.value}</div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DropdownMenu;