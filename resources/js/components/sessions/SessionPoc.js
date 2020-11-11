import React from 'react';
import CheckboxGroup from '../utilities/CheckboxGroup';

const SessionPoc = (props) => {
    const options = [
        {
            label: 'Continue POC',
            value: 'continue',
        },
        {
            label: 'Modify POC',
            value: 'modify',
        },
        {
            label: 'Discontinue POC',
            value: 'discontinue',
        },
    ];

    return (
        <React.Fragment>
            <h3>Session Notes</h3>
            <CheckboxGroup
                options={options}
                onChange={props.submit}
            />
        </React.Fragment>
    )
}

export default SessionPoc;