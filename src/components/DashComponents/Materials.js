import React, { useState, useEffect } from 'react'
import { Button, Image, Table } from 'react-bootstrap'
import axios from 'axios'
// import MaterialModal from './MaterialModal'
const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Materials({ setAddMaterial }) {
    const [materials, setMaterials] = useState([])
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
    return (
        <div>
            <Button onClick={() => setAddMaterial(sm => !sm)}>Add a material</Button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Material</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {materials.map((material, id) => (
                        <tr key={id}>
                            <td>{id + 1}</td>
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
        </div>
    )
}
