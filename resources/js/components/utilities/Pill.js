import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';

class Pill extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="session-date">
                <div className="mr-3 align-self-center">
                    <FaCog />
                </div>
                <div className="details flex-grow-1">
                    {Array.isArray(this.props.main) ?
                        this.props.main.map((i, key) => (
                            <div key={key}>{i}</div>
                        ))
                        :
                        <span>{this.props.main}</span>
                    }
                </div>
                <div className="align-self-center">
                    <input type="checkbox" />
                </div>
            </div>
        )
    }
}

export default Pill;