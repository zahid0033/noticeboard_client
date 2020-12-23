import React,{Component} from "react";
import {connect} from "react-redux"
import {Jumbotron} from "react-bootstrap";

class Home extends Component {

    render() {
        return(
            <div className="container">
                <div  style={{height: "100%", background:"#d8d8d8"}}>
                    <h1 className="text-center mb-4"> Profile </h1>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})


export default connect(mapStateToProps)(Home)