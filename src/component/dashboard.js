import React,{Component} from 'react';
import {connect} from "react-redux";
import * as authActions from '../redux/actions/authActions'
import {Link} from "react-router-dom";
import axios from 'axios'
import {Table} from "react-bootstrap";

class Dashboard extends Component {
    componentDidMount() {
        // this.props.setUsers()
    }

    render() {
        return (
            <div className="container">
                <h1>Welcome to the Boilerplate Dashboard</h1>
                <Link to={"/agent"} >Agent Home (it's a Protected Route.. Cant access without login) </Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data : state.auth
    }
}

export default connect(mapStateToProps,authActions)(Dashboard);