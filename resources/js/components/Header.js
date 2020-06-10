import React, { useState } from 'react'
import { NavLink as RRNavLink, withRouter } from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const Header = (props) => {
    const [navOpen, setNavOpen] = useState(false);

    const logOut = () => {
        let appState = {
            isLoggedIn: false,
            user: {},
            remember_me: props.remember_me,
        }

        localStorage['appState'] = JSON.stringify(appState);
        props.history.push('/login');
        props.update(appState);
    }

    console.log('remmember',props.remember_me);
    return(
        <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={RRNavLink} to="/">Docutherapy</NavbarBrand>
            <NavbarToggler onClick={()=>setNavOpen(!navOpen)} />
            <Collapse isOpen={navOpen} navbar className="justify-content-end">
                {props.userIsLoggedIn ? (
                    <React.Fragment>
                        <NavLink className="c-pointer" onClick={logOut}>Log Out</NavLink>
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
    )
}

export default withRouter(Header);