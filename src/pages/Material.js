import React, { useState } from 'react';
import { Container, Form, Row, Col, Button, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Materials from '../components/DashComponents/Materials';
import { useSelector } from 'react-redux';
import axios from 'axios';
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Material() {
    const [addMaterial, setAddMaterial] = useState(false)
    const [file, setFile] = useState()
    const [loading, setLoading] = useState()
    const { user } = useSelector(state => state.auth)
    const { handleSubmit, register, watch } = useForm({
        defaultValues: {
            adminid: user.id,
            materialtype: 'Text',
            material: ''
        }
    })
    const materialtype = watch('materialtype')
    const addNewMaterial = async (values) => {
        setLoading(true)
        if (materialtype === "Image" || materialtype === "Video") {
            upload(file, values)
        } else {
            try {
                const { data } = await axios.post(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/addmaterial`, values)
                console.log(data.message)
                if (data.success) {
                    setLoading(false)
                    setAddMaterial(false)
                }
            } catch (error) {
                setLoading(false)
                console.log(error.message)
            }
        }
    }
    const upload = async (uploadfile, values) => {
        if (!file) {
            alert("Select a file to upload first")
            setLoading(false)
            return
        }
        try {
            const uploaddata = new FormData()
            uploaddata.append('file', uploadfile)
            uploaddata.append('values', JSON.stringify(values))
            const { data } = await axios.post(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/upload`, uploaddata)
            console.log(data.message)
            if (data.success) {
                setLoading(false)
                setAddMaterial(false)
            } else {
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            console.log(error.message)
        }

    }
    return (
        <Container>
            <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                {addMaterial ?
                    <Col style={{ marginTop: "20px" }}>
                        <Form onSubmit={handleSubmit(addNewMaterial)}>
                            <h1>Add a material</h1>
                            <Form.Group style={{ display: 'none' }}>
                                <Form.Label>adminid</Form.Label>
                                <Form.Control name="adminid" defaultValue={user.id} ref={register({
                                    required: "You must select a material type",
                                })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Material name</Form.Label>
                                <Form.Control name="name" ref={register({
                                    required: "You must give a material name",
                                })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select material type</Form.Label>
                                <Form.Control as="select" name="materialtype" ref={register({
                                    required: "You must select a material type",
                                })}>
                                    <option>Text</option>
                                    <option>Image</option>
                                    <option>Video</option>
                                </Form.Control>
                            </Form.Group>
                            {materialtype === 'Text' &&
                                <Form.Group>
                                    <Form.Label>Enter Text Here</Form.Label>
                                    <Form.Control as="textarea" name="material" ref={register} />
                                </Form.Group>
                            }
                            {materialtype === 'Image' &&
                                <Form.Group>
                                    <Form.Label>Select Image Here</Form.Label>
                                    <Form.File onChange={e => setFile(e.target.files[0])} />
                                </Form.Group>
                            }
                            {materialtype === 'Video' &&
                                <Form.Group>
                                    <Form.Label>Select Video Here</Form.Label>
                                    <Form.File onChange={e => setFile(e.target.files[0])} />
                                </Form.Group>
                            }
                            <Button type="button" variant="secondary" onClick={() => setAddMaterial(up => !up)}>Cancel</Button>
                            {loading ? <Spinner animation="border" /> : <Button type="submit" variant="primary">Upload</Button>}
                        </Form>
                    </Col>
                    :
                    <Col>
                        <Materials setAddMaterial={sm => setAddMaterial(sm)} />
                    </Col>
                }
            </Row>
        </Container>
    )
}
