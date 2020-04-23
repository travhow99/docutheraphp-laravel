import React, { Component } from 'react';
import { FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Pill extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="session-date">
                <div className="mr-3 align-self-center">
                    <Link to={this.props.target}>
                        <FaCog style={{cursor: 'pointer'}} />
                    </Link>
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
                    <div className="border border-danger" style={{
                        width: '1rem',
                        height: '1rem',
                    }}></div>
                </div>
            </div>
        )
    }
}

export default Pill;