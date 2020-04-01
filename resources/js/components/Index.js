import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Router />
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

