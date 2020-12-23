import React,{Component} from "react";
import {connect} from "react-redux";
import {Modal,Button} from "react-bootstrap";
import axios from "axios";

class UploadModal extends Component {
    state = {
        image: null,
        material:[],
        showModal: false
    }

    uploadImage = async () => {

        const formdata = new FormData();
        formdata.set("upload_preset","d26wpbx3")
        formdata.append("file",this.state.image)

        // await axios.post("https://api.cloudinary.com/v1_1/zahid0033/upload",formdata)
        //     .then(res => {
        //         console.log(res.data)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })

        await axios.post(`/agentAction/materialPost`,formdata,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="file"
                        onChange={event => {
                            this.setState({
                                image: event.target.files[0]
                            })
                        }}
                    />
                    <input type="submit" value="submit" onClick={this.uploadImage} className="btn btn-primary"/>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect(null,null)(UploadModal)