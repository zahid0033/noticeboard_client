import React,{Component} from "react";
import {connect} from 'react-redux'
import axios from 'axios';

class ProgramEdit extends Component {
    state = {
        program : null
    }

    componentDidMount() {
        // this.fetchProgram()
        axios.get(`/agentAction/program/${this.props.match.params.programId}`)
            .then(res => {
                this.setState({
                    program : res.data.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    fetchProgram = async () => {
        await axios.get(`/agentAction/program/${this.props.match.params.programId}`)
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
        const {program} = this.state;
        return (
            <div className="container">
                {
                    program !== null ?
                        (
                            <>

                                <button className="btn btn-primary">Upload materials</button>
                                <div className="row">
                                    <div className="col-md-2"><p><b>Name :</b></p></div>
                                    <div className="col-md-10"><p>{program.name}</p></div>
                                    <div className="col-md-2"><p><b>Display Type :</b></p></div>
                                    <div className="col-md-10"><p>{program.display_type}</p></div>
                                </div>
                            </>
                        ):
                        (
                            <></>
                        )
                }
                {/*{program.name}*/}
            </div>
        )
    }
}

export default connect(null,null)(ProgramEdit)