import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col, Form } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import axios from 'axios'
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Noticeboard() {
    const [addNewNotice, setAddNewNotice] = useState()
    const { handleSubmit, register } = useForm()
    const [materialQuery, setMaterialQuery] = useState()
    const [materials, setMaterials] = useState()
    const [queryMaterials, setQueryMaterials] = useState()
    const addNotice = async values => {
        try {
            const { data } = await axios.post(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/addnotice`, values)
            if (data.success) {
                setAddNewNotice(!data.success)
            }
            console.log(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const getMaterials = async () => {
        try {
            const { data } = await axios.get(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/getmaterials`)
            if (data.success) {
                setMaterials(data.materials)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getMaterials()
    }, [])

    useEffect(() => {
        setQueryMaterials(materials?.filter(material => {
            return material.name?.toLowerCase().includes(materialQuery?.toLowerCase()) || !materialQuery
        }))
    }, [materialQuery, materials])

    return (
        <Container>
            <Row className="justify-content-md-center">
                {!addNewNotice &&
                    <Col>
                        <Button onClick={() => setAddNewNotice(nn => !nn)}>Add Notice</Button>
                    </Col>
                }
                {addNewNotice &&
                    <Col>
                        <Form style={{ marginTop: "40px" }} onSubmit={handleSubmit(addNotice)}>
                            <Form.Group>
                                <Form.Label>Notice Name</Form.Label>
                                <Form.Control name="name" ref={register({
                                    required: "You must input a notice name",
                                })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select notice type</Form.Label>
                                <Form.Control as="select" defaultValue="Text" name="materialtype" ref={register({
                                    required: "You must select a material type",
                                })}>
                                    <option>Text</option>
                                    <option>Image</option>
                                    <option>Video</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select a material from here</Form.Label>
                                <Form.Control onChange={e => setMaterialQuery(e.target.value)} />
                                <Form.Control as="select" name="material" ref={register({
                                    required: "You must select a material",
                                })}>
                                    {queryMaterials?.map((material, id) => (
                                        <option key={id} value={material._id}>{material.name}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Button type="button" variant="secondary" onClick={() => setAddNewNotice(nn => !nn)}>Cancel</Button>
                            <Button type="submit" variant="primary">Add Notice</Button>
                        </Form>
                    </Col>
                }
            </Row>
        </Container>
    )
}
