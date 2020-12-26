import React from 'react'
import { Button } from 'react-bootstrap'

export default function Materials({ setAddMaterial }) {
    return (
        <div>
            <Button onClick={() => setAddMaterial(sm => !sm)}>Add a material</Button>
        </div>
    )
}
