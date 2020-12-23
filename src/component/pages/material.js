import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Image} from 'cloudinary-react';
import axios from 'axios'

class Material extends Component {

    state = {
        image: null,
        material:[]
    }

    componentDidMount() {
        this.fetchMaterial()
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
        return(
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-12">
                        <input
                            type="file"
                            onChange={event => {
                                this.setState({
                                    image: event.target.files[0]
                                })
                            }}
                        />
                        <input type="submit" value="submit" onClick={this.uploadImage} className="btn btn-primary"/>
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