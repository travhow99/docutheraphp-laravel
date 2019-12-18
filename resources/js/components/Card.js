import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';

export default class Card extends Component {
    render() {
        return (
            <div className="card mb-4">
                <div className="card-header">{this.props.title}</div>
                <div className="card-body">I'm an example component!</div>
                <Button />
            </div>
        );
    }
}

if (document.getElementById('card')) {

    const el = document.getElementById('card');

    // Get data-attributes from element, and convert to props to be passed
    const props = Object.assign({}, el.dataset);

    ReactDOM.render(<Card {...props} />, el);
}
