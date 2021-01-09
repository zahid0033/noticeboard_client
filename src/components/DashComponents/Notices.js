import React, { useEffect, useState, useCallback } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Col, Spinner, Table, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
export default function Notices() {
    const { user } = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const [noticeSets, setNoticeSets] = useState([])
    const history = useHistory()
    const getNoticeSets = useCallback(async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`/admin/getnoticesets/${user.organization}`)
            if (data.success) {
                setNoticeSets(data.noticesets)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
        setLoading(false)
    }, [user.organization])

    useEffect(() => {
        getNoticeSets()
    }, [getNoticeSets])
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
                            <th>No. of Materials</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noticeSets.map((noticeset, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{noticeset?.name}</td>
                                <td>{noticeset?.viewtype}</td>
                                <td>{noticeset?.materials?.length}</td>
                                <td>
                                    <Button id={noticeset._id} onClick={e => history.push(`/editnoticeset/${e.target.id}`)}>View/Edit</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            }
        </Col>
    )
}
