import React,{Component} from "react";
import {connect} from "react-redux";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";

class ProgramAddModal extends Component {
    state = {
        programName:"",
        numberOfContent : "",
        display_type: ""
    }

    addProgram = async (e) => {
        console.log("triggered")
        e.preventDefault()
        const data = {
            name : this.state.programName,
            display_type : this.state.display_type
        }
        console.log(data)

        await axios.post(`/agentAction/programAdd`,data)
            .then(res => {
                console.log(res.data)
                console.log(this.props)
                this.props.closeModal()
                this.props.fetchProgram()
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


    render() {
        console.log(this.props)
        console.log(this.state)
        return (
            <Modal show={this.props.show} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name="programName" onChange={this.changeHandler}/>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect2">
                            <Form.Label>Display Number of content</Form.Label>
                            <Form.Control as="select" name="numberOfContent" onChange={this.changeHandler}>
                                <option >Choose an option</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Display Type</Form.Label>
                            <Form.Control as="select" name="display_type" onChange={this.changeHandler}>
                                <option >choose an option</option>
                                <option value="All Content in one Page">All Content in one Page</option>
                                <option value="Display in slider">Display in slider</option>
                            </Form.Control>
                        </Form.Group>
                        <input type="submit" value="submit" onClick={this.addProgram} className="btn btn-primary"/>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null,null)(ProgramAddModal)