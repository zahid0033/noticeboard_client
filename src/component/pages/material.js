import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Image} from 'cloudinary-react';
import axios from 'axios'
import {Button} from 'react-bootstrap'
import UploadModal from "./uploadModal";

class Material extends Component {

    state = {
        material:[],
        showModal: false
    }

    componentDidMount() {
        this.fetchMaterial()
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

    fetchMaterial = async () => {
        await axios.get(`/agentAction/allMaterial`)
            .then(res => {
                this.setState({
                    material : res.data.data
                })
                console.log(this.state.material)
            })
            .catch(err => {
                console.log(err)
            })
    }

    renderMaterial = () => {
        console.log(this.state.material)
        return this.state.material.length > 0 && this.state.material.map((material,key) => {
            return (
                <div className="col-md-3 mb-3" key={key}>
                    <Image cloudName="zahid0033" publicId={`${material.url}`} crop="scale"/>
                </div>
            )
        })
    }


    render() {
        return(
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <Button variant="primary" onClick={this.showModal}>
                            Add New Materials
                        </Button>
                        <UploadModal show={this.state.showModal} showModal={this.showModal} closeModal={this.closeModal}  />

                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className="list-group-item active"><i className="fa fa-camera-retro" aria-hidden="true"></i> Image</li>
                            <li className="list-group-item"><i className="fa fa-video-camera" aria-hidden="true"></i> Video</li>
                            <li className="list-group-item"><i className="fa fa-text-width" aria-hidden="true"></i> Text</li>
                        </ul>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            {this.state.material.length > 0 && this.renderMaterial()}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default connect(mapStateToProps,null)(Material)