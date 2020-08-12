import React from 'react';
import { Label, Input } from 'reactstrap';

const ToggleSwitch = (props) => {

    return(
        <Label className="toggle-switch ml-3">
            <input name={props.name} checked={props.isChecked} onChange={props.toggle} className="toggle-switch-checkbox" type="checkbox" />
            <span className="toggle-switch-slider"></span>
        </Label>
    )

}

export default ToggleSwitch;