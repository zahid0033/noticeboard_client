import { Container, Row } from 'react-bootstrap'
import Notices from '../components/DashComponents/Notices';

export default function Noticeboard() {
    return (
        <Container>
            <Row lg={1} md={1} sm={1} xl={1} xs={1}>
                < Notices />
            </Row >
        </Container >
    )
}
