import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Button extends Component {
    render() {
        return (
            <div className="btn btn-primary">
                Test
            </div>
        );
    }
}

/* if (document.getElementsByClassName('button')) {

    const el = document.getElementsByClassName('button');

    // Get data-attributes from element, and convert to props to be passed
    const props = Object.assign({}, el.dataset);

    ReactDOM.render(<Button {...props} />, el);
}
 */