import React, { useEffect } from 'react'
import { Container, Form, Row, Col, Alert, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useSelector } from 'react-redux'

const { REACT_APP_NOT_AXIOS_BASE_URL } = process.env;

export default function Register() {
    const { register, handleSubmit, watch, errors } = useForm()
    const history = useHistory()
    const { isAuthenticated } = useSelector(state => state.auth)

    const registerAdmin = async (values) => {
        try {
            const { data } = await axios.post(`${REACT_APP_NOT_AXIOS_BASE_URL}/admin/register`, values)
            if (data.success) {
                history.push('/login')
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.messaage)

        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            history.push('/')
        }
    }, [isAuthenticated, history])

    return (
        <>
            {!isAuthenticated &&
                <Container>
                    <Row className="justify-content-md-center">
                        <Col lg="auto" md="auto">
                            <Form onSubmit={handleSubmit(registerAdmin)} style={{ marginTop: "40px" }}>
                                <h1>রেজিস্টার করুন</h1>
                                <Form.Group>
                                    <Form.Label>ইউজার নেম</Form.Label>
                                    <Form.Control className={errors?.name?.type === "required" && 'is-invalid'} type="text" name="name" ref={register({
                                        required: "ইউজার নেম ইনপুট করতে হবে "
                                    })} placeholder="ইউজার নেম ইনপুট করুন" />
                                    {errors?.name?.type === "required" && <div className="invalid-feedback">{errors.name.message}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>অর্গানাইজেশন </Form.Label>
                                    <Form.Control className={errors?.organization?.type === "required" && 'is-invalid'} type="text" name="organization" ref={register({
                                        required: "অর্গানাইজেশন ইনপুট করতে হবে "
                                    })} placeholder="আপনার অর্গানাইজেশন ইনপুট করুন" />
                                    {errors?.organization?.type === "required" && <div className="invalid-feedback">{errors.organization.message}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>পাসওয়ার্ড</Form.Label>
                                    <Form.Control className={errors?.password?.type === "required" && 'is-invalid'} type="password" name="password" ref={register({
                                        required: "পাসওয়ার্ড ইনপুট করতে হবে "
                                    })} placeholder="পাসওয়ার্ড ইনপুট করুন" />
                                    {errors?.password?.type === "required" && <div className="invalid-feedback">{errors?.password?.message}</div>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>কন্ফার্ম পাসওয়ার্ড </Form.Label>
                                    <Form.Control className={(errors?.confirmpassword?.type || errors?.validate?.type === "required") && 'is-invalid'} type="password" name="confirmpassword" ref={register({
                                        required: "পাসওয়ার্ড পুনরায় ইনপুট করতে হবে ",
                                        validate: value => value === watch('password') || "password don't match"
                                    })} placeholder="পাসওয়ার্ডটি পুনরায় ইনপুট করুন" />
                                    {errors?.confirmpassword?.type === "required" && <div className="invalid-feedback">{errors?.confirmpassword?.message}</div>}
                                    {errors?.confirmpassword?.type === "validate" && <div className="invalid-feedback">{errors?.confirmpassword?.message}</div>}
                                </Form.Group>
                                <Button className="btn btn-primary btn-lg" type="submit">রেজিস্টার</Button>
                                <p style={{ marginTop: "20px" }}><Alert.Link as={Link} to="/login">লগইন করুন</Alert.Link></p>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            }
        </>
    )
}

