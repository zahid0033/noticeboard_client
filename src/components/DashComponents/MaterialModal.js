import React from 'react'
import { Image, OverlayTrigger, Popover } from 'react-bootstrap';

export default function MaterialModal({ type, material }) {
    const popover = (
        <Popover id="popover-basic">
            {type === 'Image' ? (
                <Image src={`${material}`} rounded />
            ) : (
                    <p>{material}</p>
                )}
            <Popover.Content>
            </Popover.Content>
        </Popover>
    );
    return (
        <OverlayTrigger trigger="hover" placement="auto" overlay={popover}>
            <td>View Material</td>
        </OverlayTrigger>
    )
}
