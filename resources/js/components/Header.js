import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.userData,
            isLoggedIn: props.userIsLoggedIn,
            navIsOpen: false,
        };

        this.logOut = this.logOut.bind(this);
        this.setIsOpen = this.setIsOpen.bind(this);
    }

    componentDidMount() {
        console.log(this.state);
    }

    logOut() {
        let appState = {
            isLoggedIn: false,
            user: {},
        };

        localStorage["appState"] = JSON.stringify(appState);
        this.setState(appState);
        this.props.history.push('/login');
    }

    setIsOpen() {
        this.setState({
            navIsOpen: !this.state.navIsOpen,
        });
    }

    render() {
        const toggle = () => this.setIsOpen(!this.state.navIsOpen);
        const aStyle = {
            cursor: 'pointer',
        };

        return (
            <React.Fragment>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand tag={RRNavLink} to="/">Docutherapy</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={this.state.navIsOpen} navbar>
                        {this.state.isLoggedIn ? (
                            <React.Fragment>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/clients'>Clients</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/contacts'>Contacts</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/sessions'>Sessions</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/documentation'>Documentation</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={RRNavLink} to='/templates'>Templates</NavLink>
                                    </NavItem>
                                </Nav>
                                <NavLink onClick={this.logOut}>Log Out</NavLink>
                            </React.Fragment>
                            ) : (
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to='/login'>Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to='/register'>Register</NavLink>
                                </NavItem>
                            </Nav>
                            )
                        }
                    </Collapse>
                </Navbar>
            </React.Fragment>
        )
    }
}

export default Header