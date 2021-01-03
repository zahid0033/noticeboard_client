import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Col, Image, Spinner, Table, Button } from 'react-bootstrap'
export default function Notices() {
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [notices, setNotices] = useState([])
    const getNotices = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/admin/getorgnotices/${user.organization}`)
            if (data.success) {
                setNotices(data.notices)
                console.log(data.notices)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [user.organization])

    const setNoticeStatus = async (e) => {
        try {
            const { data } = await axios.post(`/admin/setnoticestatus/${e.target.id}`, {
                status: e.target.value
            })
            if (data.success) {
                getNotices()
            } else {
                console.log(data.message)
            }
            console.log(e.target.value)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getNotices()
    }, [getNotices])
    return (
        <Col style={{ marginTop: "20px" }}>
            <h2>All notices</h2>
            {loading ?
                <Spinner animation="border" /> : <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Material</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notices.map((notice, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{notice?.name}</td>
                                <td>{notice?.materialtype}</td>
                                <td>
                                    {notice?.materialtype === "Image" ?
                                        <Image src={notice?.material?.material} style={{ maxHeight: "40px" }} rounded /> : <p style={{ maxHeight: "40px", overflow: "hidden" }}>{notice?.material?.material}</p>
                                    }
                                </td>
                                <td>
                                    <Button id={notice._id} className={notice.status ? "buttonon" : "buttonoff"} value={notice.status ? "on" : "off"} onClick={setNoticeStatus}>{notice?.status ? "On" : "Off"}</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Col>
    )
}
