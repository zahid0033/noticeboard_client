import React, { useState } from 'react'
import { Container, Form, Row, Col, Alert, Button, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import setCurrentUser from "../redux/actions/setCurrentUser";
import { useDispatch, useSelector } from 'react-redux';

const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Login() {
    const { errors, register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.auth)
    const loginAdmin = async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.post(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/login`, values)
            if (data.success) {
                const decoded = jwt_decode(data.token);
                localStorage.setItem("jwtToken", data.token);
                setAuthToken(data.token);
                dispatch(setCurrentUser(decoded));
                setLoading(false)
                history.push('/')
            } else {
                setLoading(false)
                console.log(data.message)
            }
        } catch (error) {
            setLoading(false)
            console.log(error.messaage)

        }
    }

    // useEffect(() => {
    //     if (isAuthenticated) {
    //         history.push('/')
    //     }
    // }, [isAuthenticated])

    return (
        <>
            {!isAuthenticated &&
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="auto" md="auto">
                            <Form onSubmit={handleSubmit(loginAdmin)} style={{ marginTop: "40px" }}>
                                <h1>লগইন করুন</h1>
                                <Form.Group>
                                    <Form.Label>ইউজার নেম</Form.Label>
                                    <Form.Control className={errors?.name?.type === "required" && 'is-invalid'} type="text" name="name" ref={register({
                                        required: "ইউজার নেম ইনপুট করতে হবে "
                                    })} placeholder="ইউজার নেম ইনপুট করুন" />
                                    {errors?.name?.type === "required" && <div className="invalid-feedback">{errors.name.message}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>পাসওয়ার্ড</Form.Label>
                                    <Form.Control className={errors?.password?.type === "required" && 'is-invalid'} type="password" name="password" ref={register({
                                        required: "পাসওয়ার্ড ইনপুট করতে হবে "
                                    })} placeholder="পাসওয়ার্ড ইনপুট করুন" />
                                    {errors?.password?.type === "required" && <div className="invalid-feedback">{errors.password.message}</div>}
                                </Form.Group>
                                {loading ? (
                                    <Spinner animation="border" />
                                ) : (
                                        <Button className="btn btn-primary btn-lg" type="submit">লগইন</Button>
                                    )}
                                <p style={{ marginTop: "20px" }}><Alert.Link as={Link} to="/register">নতুন একাউন্টের জন্য রেজিস্টার করুন</Alert.Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container >
            }
        </>
    )
}
