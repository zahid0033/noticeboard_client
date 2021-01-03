import React, { useState, useEffect, useCallback } from 'react'
import { Row, Col, Card, Spinner, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
export default function NoticeBoards() {
    const [loading, setLoading] = useState(false)
    const [noticeBoards, setNoticeBoards] = useState()
    const { user } = useSelector(state => state.auth)
    const history = useHistory()
    const getNoticeBoards = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/admin/getnoticeboards/${user.organization}`)
            if (data.success) {
                setNoticeBoards(data.noticeboards)
                console.log(data.noticeboards)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [user.organization])
    useEffect(() => {
        getNoticeBoards()
    }, [getNoticeBoards])
    return (
        <Row lg={1} md={1} sm={1} xl={1} xs={1}>
            <Col>
                <h1>All notice boards</h1>
                {loading ? <Spinner animation="border" /> :
                    <>
                        {noticeBoards?.map((noticeboard, id) => (
                            <Col style={{ padding: 0, margin: "20px" }} key={id} as={Card} className="noticeboardcard">
                                <Card.Header>{noticeboard?.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>Organization id: {noticeboard?.organization}</Card.Title>
                                    <Card.Text>Last update id: {noticeboard?.lastUpdateid}</Card.Text>
                                    <Button value={noticeboard?._id} onClick={e => history.push(`/noticeboard/${e.target.value}`)}>Edit</Button>
                                </Card.Body>
                            </Col>
                        ))}
                    </>
                }
            </Col>
        </Row>
    )
}