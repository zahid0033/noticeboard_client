import React, { useState, useEffect } from 'react'
import { Button, Image, Table, Spinner, Row, Col } from 'react-bootstrap'
import axios from 'axios'
// import MaterialModal from './MaterialModal'
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Materials({ setAddMaterial }) {
    const [materials, setMaterials] = useState([])
    const [loading, setLoading] = useState(false)
    const getMaterials = async () => {
        setLoading(true)
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
        setLoading(false)
    }

    useEffect(() => {
        getMaterials()
    }, [])
    return (
        <>
            <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                <Col style={{ marginTop: "20px" }}>
                    <Button onClick={() => setAddMaterial(sm => !sm)}>Add a material</Button>
                </Col>
                <Col style={{ marginTop: "20px" }}>
                    {loading ? <Spinner animation="border" /> :
                        <>
                            <h1>All materials</h1>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Material</th>
                                        <th>Type</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materials.map((material, id) => (
                                        <tr key={id}>
                                            <td>{id + 1}</td>
                                            <td>{material.name}</td>
                                            <td>
                                                {material.materialtype === "Image" ?
                                                    <Image src={material.material} style={{ maxHeight: "40px" }} rounded /> : <p style={{ maxHeight: "40px", overflow: "hidden" }}>{material.material}</p>
                                                }
                                            </td>
                                            <td>{material.materialtype}</td>
                                            {/* <MaterialModal id={id} type={material.materialtype} material={material.material} /> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </>
                    }
                </Col>
            </Row>
        </>
    )
}
