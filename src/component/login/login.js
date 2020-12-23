import React,{Component} from 'react';
import {connect} from "react-redux";
import {Jumbotron, Form, Button} from "react-bootstrap"
import {bindActionCreators} from "redux";
import {loginAgent} from "../../redux/actions/agentActions";

class Login extends Component {
    state = {
        email: "",
        password : ""
    }

    onSubmit = (e) => {
        e.preventDefault();
        const agentData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginAgent(agentData,this.props.history)
    }

    onChange = e => {

        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        return (
            <div className="container">
                <Jumbotron className="mt-5">
                    {this.props.errors}
                    <h2 className="text-center">Login</h2>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" onChange={this.onChange} />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={this.onChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Jumbotron>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        loginAgent
    },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);