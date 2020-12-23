import React,{Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios'

class Admin extends Component {
    state = {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <button className="btn btn-suucess">Upload Granite Information</button>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})



export default connect(mapStateToProps)(Admin)