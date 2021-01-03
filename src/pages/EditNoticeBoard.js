import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col, Form, Spinner, Button, Badge, ListGroup } from 'react-bootstrap'
import axios from 'axios';
import { useForm } from 'react-hook-form';

export default function EditNoticeBoard({ match }) {
    const [noticeboard, setNoticeboard] = useState({})
    const [notices, setNotices] = useState([])
    const [loading, setLoading] = useState(false)
    const [changeViewLoading, setChangeViewLoading] = useState(false)
    // const [toggleLoading, setToggleLoading] = useState(false)
    const { handleSubmit, register, watch } = useForm({
        defaultValues: {
            displaytype: noticeboard?.displaytype,
            selectednotices: noticeboard?.selectednotices
        }
    })
    const getNoticeBoard = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/admin/getnoticeboard/${match.params.id}`)
            if (data.success) {
                setNoticeboard(data.noticeboard)
                console.log(data)
                getNotices()
            }
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [match.params.id])

    const getNotices = async () => {
        try {
            const { data } = await axios.get(`/admin/getnotices`)
            if (data.success) {
                setNotices(data.notices)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    const setBoard = async (values) => {
        setChangeViewLoading(true)
        try {
            console.log(values)
            const { data } = await axios.post(`/admin/changeView/${match.params.id}`, values)
            if (data.success) {
                getNoticeBoard()
            }
        } catch (error) {
            console.log(error.message)
        }
        setChangeViewLoading(false)
    }
    // const toggleheadline = useCallback(async () => {
    //     setToggleLoading(true)
    //     try {
    //         const { data } = await axios.post(`/admin/toggleheadline/${match.params.id}`)
    //         if (data.success) {
    //             getNoticeBoard()
    //         }
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    //     setToggleLoading(false)
    // }, [match.params.id, getNoticeBoard])

    useEffect(() => {
        getNoticeBoard()
    }, [getNoticeBoard])
    return (
        <Container>
            <Row lg={1} md={1} sm={1} xl={1} xs={1} as={Form} onSubmit={handleSubmit(setBoard)}>
                <Col style={{ marginTop: "20px" }}>
                    {loading ?
                        <Spinner animation="border" /> :
                        <>
                            <Form.Group>
                                <Form.Label>Select display type</Form.Label>
                                <Form.Control disabled={changeViewLoading} as="select" name="displaytype" defaultValue={noticeboard?.displaytype} ref={register}>
                                    <option value="grid">Grid</option>
                                    <option value="slider">Slider</option>
                                    <option value="singleimage">Single image</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                    }
                </Col>
                {watch('displaytype') === "grid" && < Col >
                    <h1>Select any notices upto 8</h1>
                    <p>Grid can only show upto 8 notices</p>
                    {notices?.map((notice, id) => (
                        <Form.Check
                            disabled={changeViewLoading}
                            key={id}
                            type="checkbox"
                            id="selectednotices"
                            name="selectednotices"
                            label={notice.name}
                            value={notice._id}
                            ref={register}
                        />
                    ))}
                </Col>}
                {watch('displaytype') === "slider" && < Col >
                    <h1>Select some notice to view</h1>
                    <p>Slider will show them in a carousel</p>
                    {notices?.map((notice, id) => (
                        <Form.Check
                            disabled={changeViewLoading}
                            key={id}
                            type="checkbox"
                            id="selectednotices"
                            name="selectednotices"
                            label={notice.name}
                            value={notice._id}
                            ref={register}
                        />
                    ))}
                </Col>}
                {watch('displaytype') === "singleimage" && < Col >
                    <h1>Select 1 notice</h1>
                    <p>Only 1 notice will be shown</p>
                    {notices?.map((notice, id) => (
                        <Form.Check
                            disabled={changeViewLoading}
                            key={id}
                            type="checkbox"
                            id="selectednotices"
                            name="selectednotices"
                            label={notice.name}
                            value={notice._id}
                            ref={register}
                        />
                    ))}
                </Col>}
                <Button disabled={changeViewLoading} type="submit">{changeViewLoading ? <Spinner animation="border" /> : "Submit"}</Button>
            </Row>
            {/* <Row>
                <Col>
                    <Form.Check
                        disabled={toggleLoading}
                        type="switch"
                        checked={noticeboard?.headline}
                        id={noticeboard._id}
                        label="Enable Headline"
                        onChange={toggleheadline}
                    />
                </Col>
            </Row> */}
            <Row>
                <Col>
                    <h1>Selected Notices</h1>
                    <ListGroup>
                        {noticeboard?.selectednotices?.map((selectednotice, id) => (
                            <ListGroup.Item key={id}><Badge variant="secondary">{id + 1}</Badge> {selectednotice.name}</ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container >
    )
}
