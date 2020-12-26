import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Materials from '../components/DashComponents/Materials';
import { useSelector } from 'react-redux';

export default function Material() {
    const [addMaterial, setAddMaterial] = useState(false)
    const [file, setFile] = useState()
    const { user } = useSelector(state => state.auth)
    const { errors, handleSubmit, register, watch } = useForm({
        defaultValues: {
            adminid: user.id,
            materialtype: 'Text'
        }
    })
    const materialtype = watch('materialtype')
    const addNewMaterial = async (values) => {
        console.log(values)
    }

    return (
        <Container>
            <Row className="justify-content-md-center">
                {addMaterial ?
                    <Col lg="auto" md="auto">
                        <Form style={{ marginTop: "40px" }} onSubmit={handleSubmit(addNewMaterial)}>
                            <Form.Group style={{ display: 'none' }}>
                                <Form.Label>adminid</Form.Label>
                                <Form.Control name="adminid" defaultValue={user.id} ref={register({
                                    required: "You must select a material type",
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
                                    <Form.Control as="textarea" />
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
                                    <Form.File />
                                </Form.Group>
                            }
                            <Button type="button" variant="secondary" onClick={() => setAddMaterial(up => !up)}>Cancel</Button>
                            <Button type="submit" variant="primary">Upload</Button>
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
