import React from 'react';

const CrudTableCell = (props) => {
    const buildCell = (key) => {
        const val = props.item[key];

        // Reserve data- attributes for keys & functions

        
    }

    console.log('cell proops:', props);
    if (props.field.indexOf('data-') === 0) return null;

    return (
        <td>
            {props.val}
        </td>
    )
}

export default CrudTableCell