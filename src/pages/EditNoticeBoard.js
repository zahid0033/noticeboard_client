import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Form, Spinner, Button, InputGroup, FormControl } from 'react-bootstrap'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;
const socket = io(REACT_APP_NOT_AXIOS_BASE_URL)

export default function EditNoticeBoard({ match }) {
    const [noticeboard, setNoticeboard] = useState({})
    const [addNewNoticeSet, setAddNewNoticeSet] = useState(false)
    const [noticeSets, setNoticeSets] = useState([])
    const [noticeSetQuery, setNoticeSetQuery] = useState('')
    const [materials, setMaterials] = useState([])
    const [materialQuery, setMaterialQuery] = useState()
    const [editNoticeSet, setEditNoticeSet] = useState(false)
    //const [loading, setLoading] = useState(false)
    const [materialloading, setMaterialloading] = useState(false)
    //const [noticeLoading, setNoticeLoading] = useState(false)
    const { user } = useSelector(state => state.auth)
    const updateData = (formData) => {
        socket.emit('updatedata', formData)
    }
    const { handleSubmit, register, watch } = useForm({
        defaultValues: {
            displaytype: noticeboard?.displaytype,
            selectednotices: noticeboard?.selectednotices
        }
    })

    const getNoticeSets = useCallback(async () => {
        try {
            const { data } = await axios.get(`/admin/getnoticesets/${user.organization}`)
            if (data.success) {
                setNoticeSets(data.noticesets)
            }
        } catch (error) {
            console.log(error.message)
        }
    }, [user.organization])

    const getMaterials = async () => {
        setMaterialloading(true)
        try {
            const { data } = await axios.get(`/admin/getmaterials`)
            if (data.success) {
                setMaterials(data.materials)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setMaterialloading(false)
    }

    const getNoticeBoard = useCallback(async () => {
        //setLoading(true)
        try {
            const { data } = await axios.get(`/admin/getnoticeboard/${match.params.id}`)
            if (data.success) {
                setNoticeboard(data.noticeboard)
                getNoticeSets()
                getMaterials()
            }
        } catch (error) {
            console.log(error.message)
        }
        //setLoading(false)
    }, [match.params.id, getNoticeSets])

    const addNoticeSet = async (values) => {
        try {
            const { data } = await axios.post(`/admin/addnoticeset/${user.organization}`, values)
            if (data.success) {
                setAddNewNoticeSet(!data.success)
            }
            console.log(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const setNoticeSetForBoard = async (values) => {
        try {
            console.log(values)
            const { data } = await axios.post(`/admin/editnoticeboard/setnoticeset/${noticeboard?._id}`, values)
            if (data.success) {
                getNoticeBoard()
                let formdata = {
                    id: noticeboard._id
                }
                updateData(formdata)
            }
            console.log(data.message)
        } catch (error) {
            console.log(error.message)
        }
        setEditNoticeSet(false)
    }

    useEffect(() => {
        getNoticeBoard()
    }, [getNoticeBoard])
    useEffect(() => {
        socket.on('connect', () => {
            socket.emit('connected', { type: 'admin', id: user.id })
        })
    }, [])
    return (
        <Container>
            <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                {!addNewNoticeSet &&
                    <Col style={{ marginTop: "20px" }}>
                        <Button onClick={() => setAddNewNoticeSet(nn => !nn)}>Add Notice</Button>
                    </Col>
                }
                {addNewNoticeSet ? (
                    <Col style={{ marginTop: "20px" }}>
                        <Form onSubmit={handleSubmit(addNoticeSet)}>
                            <h1>Add a notice set</h1>
                            <Form.Group>
                                <Form.Label>Notice Set Name</Form.Label>
                                <Form.Control name="name" ref={register({
                                    required: "You must input a notice set name",
                                })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Select notice display type</Form.Label>
                                <Form.Control as="select" defaultValue="slider" name="viewtype" ref={register({
                                    required: "You must select a notice display type",
                                })}>
                                    <option value="slider">Slider</option>
                                    <option value="singleimage">Single Image</option>
                                    {/* <option value="grid">Grid</option> */}
                                    <option value="gridslider">Grid Slider</option>
                                </Form.Control>
                            </Form.Group>
                            {watch('viewtype') !== 'singleimage' &&
                                <Form.Group>
                                    <Form.Label>Set slide interval in seconds</Form.Label>
                                    <Form.Control name="interval" type="number" ref={register({
                                        required: "You must input notice slider interval",
                                    })} />
                                </Form.Group>
                            }
                            {/* {watch('viewtype') === "singleimage" && */}
                            <Form.Group>
                                {materialloading ? <Spinner animation="border" />
                                    :
                                    <>
                                        <Form.Label>Select materials for notice</Form.Label>
                                        <Form.Control onChange={e => setMaterialQuery(e.target.value)} placeholder="Search materials here" />
                                        <div style={{ maxHeight: "200px", overflow: 'auto' }}>
                                            {materials?.filter(material => {
                                                return material.name?.toLowerCase().includes(materialQuery?.toLowerCase()) || !materialQuery
                                            }).map((material, id) => (
                                                <Form.Check
                                                    disabled={materialloading}
                                                    key={id}
                                                    type="checkbox"
                                                    id="materials"
                                                    name="materials"
                                                    label={material.name}
                                                    value={material._id}
                                                    ref={register}
                                                />))}
                                        </div>
                                    </>
                                }
                            </Form.Group>

                            {/* } */}
                            <Button type="button" variant="secondary" onClick={() => setAddNewNoticeSet(nn => !nn)}>Cancel</Button>
                            <Button type="submit" variant="primary">Add Notice</Button>
                        </Form>
                    </Col>
                ) : (
                        <Col style={{ marginTop: "20px" }}>
                            {!editNoticeSet ? (
                                <InputGroup>
                                    <FormControl disabled={true} defaultValue={noticeboard?.notice?.name} />
                                    <InputGroup.Append>
                                        <Button onClick={() => setEditNoticeSet(set => !set)}>Edit</Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            ) : (
                                    <Form onSubmit={handleSubmit(setNoticeSetForBoard)}>
                                        <Form.Group>
                                            <Form.Label>Select a Notice Set for this noticeboard</Form.Label>
                                            <Form.Control onChange={e => setNoticeSetQuery(e.target.value)} placeholder="Search notice sets here" />
                                            <Form.Control as="select" defaultValue={noticeboard?.notice?._id} name="noticeset" ref={register({
                                                required: "You must select a noticeset",
                                            })}>
                                                {noticeSets?.filter(noticeset => {
                                                    return noticeset.name?.toLowerCase().includes(noticeSetQuery?.toLowerCase()) || !noticeSetQuery
                                                }).map((noticeset, id) => (
                                                    <option key={id} value={noticeset._id}>{noticeset.name}</option>
                                                ))}
                                            </Form.Control>
                                            <Button type="button" variant="secondary" onClick={() => setEditNoticeSet(set => !set)}>Cancel</Button>
                                            <Button type="submit" variant="primary">Set notice set</Button>
                                        </Form.Group>
                                    </Form>
                                )}
                        </Col>
                    )}
            </Row>
        </Container >
    )
}
