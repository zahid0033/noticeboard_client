import React,{Component} from 'react'
import {Navbar,Nav,NavDropdown} from "react-bootstrap";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logoutUser from "../../redux/actions/authActions";
import {bindActionCreators} from "redux";

class Topbar extends Component {
    logout = () => {
        this.props.logoutUser();
    }

    render() {
        return (
            <div>
                <Navbar bg="dark" expand="lg" variant="dark">
                    <div className="container">
                        <Navbar.Brand as={Link} to="/">
                            <img
                                alt=""
                                src="/logo.svg"
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            Notice Board
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" >
                            <Nav className="ml-auto">
                                {
                                    this.props.auth.isAuthenticated ?
                                        (
                                            <>
                                                <Nav.Link as={Link} to="/agent">Devices |</Nav.Link>
                                                <Nav.Link as={Link} to="/agent">Manage |</Nav.Link>
                                                <Nav.Link as={Link} to="/material">Materials |</Nav.Link>
                                                <Nav.Link onClick={() => this.logout()}>Logout</Nav.Link>

                                            </>
                                        ) : (
                                            <>
                                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                            </>
                                        )
                                }
                            </Nav>
                        </Navbar.Collapse>
                    </div>

                </Navbar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logoutUser
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Topbar)