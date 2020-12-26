import React,{Component} from "react";
import {connect} from 'react-redux';
import {Button,Table} from "react-bootstrap";
import ProgramAddModal from "./programAddModal";
import axios from 'axios';
import {Link} from "react-router-dom";

class Program extends Component {
    state = {
        program:[],
        showModal: false
    }

    componentDidMount() {
        this.fetchProgram()
    }

    showModal = () => {
        this.setState({
            showModal: true
        })
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    renderProgram = () => (
        this.state.program.length > 0 && this.state.program.map((program,key) => (
                <tr key={key}>
                    <td>{key+1}</td>
                    <td>{program.name}</td>
                    <td>{program.display_type}</td>
                    <td><Link className="badge badge-danger" to={`/program/edit/${program._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link></td>
                </tr>
        ))

    )

    fetchProgram = async () => {
        await axios.get(`/agentAction/allProgram`)
            .then(res => {
                this.setState({
                    program : res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state.program)
        return (
            <div className="container mt-4">
                <Button variant="primary" className="mb-5" onClick={this.showModal}>
                    Add New Materials
                </Button>
                <ProgramAddModal show={this.state.showModal} showModal={this.showModal} closeModal={this.closeModal} fetchProgram={this.fetchProgram}/>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Name</th>
                            <th>Display Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProgram()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,null)(Program)