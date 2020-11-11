import React from 'react';
import { Input } from 'reactstrap';

const SessionNote = (props) => {
    return (
        <React.Fragment>
            <h3>Session Notes</h3>
            <Input
                type="textarea"
                name="goal"
                onChange={props.onChange}
                onBlur={props.submit}
                value={props.text || ''}
                placeholder={'Add a session note...'} 
            />
        </React.Fragment>
    )
}

export default SessionNote;