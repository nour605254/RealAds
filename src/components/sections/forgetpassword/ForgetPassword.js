import React, { useRef, useState } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import { Form, Alert, Button } from "react-bootstrap";

import { Link } from 'react-router-dom';
import logo from '../../../assets/images/icon/logo.png';

export default function ForgetPassword() {

    const emailRef = useRef()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const { resetPassword } = useAuth()
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setMessage('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check your inbox for futher instructions')
        } catch {
            setError('Failed to recover password')
        }
        setLoading(false)
    }

    return (

            <div className="page-wrapper">
                <div className="page-content--bge5">
                    <div className="container">
                        <div className="login-wrap">
                            <div className="login-content">
                                <div className="login-logo">
                                    <a href="#">
                                    <img src={ logo } alt="CoolAdmin" />
                                    </a>
                                </div>
                                {error && <Alert variant="danger">{error}</Alert>}
                                {message && <Alert variant="success">{message}</Alert>}
                                <div className="login-form">

                                    <Form onSubmit={handleSubmit}>
                                        <div class="form-group">
                                            <Form.Group id="email">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control className="au-input au-input--full" type="email" ref={emailRef}  required />
                                            </Form.Group>                                      
                                            <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit">Reset Password</Button>
                                        </div>
                                    </Form>
                                    <div className="login-link">
                                        <p>
                                            <Link to="/login">Login</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
}