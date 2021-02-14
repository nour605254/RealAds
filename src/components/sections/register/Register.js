import React, { useRef, useState } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import { Form, Alert, Button } from "react-bootstrap";

import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/images/icon/logo.png';

export default function Register() {

        const emailRef = useRef()
        const userRef = useRef()
        const passRef = useRef()
        const passConfirmRef = useRef()
        const { signup } = useAuth()
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)
        const history = useHistory()

        async function handleSubmit(e) {
            e.preventDefault()

            if (passRef.current.value !== passConfirmRef.current.value) {
                return setError('Password do not match')
            }

            try {
                setError('')
                setLoading(true)
                await signup(emailRef.current.value, passRef.current.value)
                history.push("/")
            } catch {
                setError('Failed to create an account')
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
                        <div className="login-form">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control className="au-input au-input--full" type="email" ref={emailRef} required />
                                </Form.Group>
                                <Form.Group id="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control className="au-input au-input--full" type="password" ref={passRef} required />
                                </Form.Group>
                                <Form.Group id="password-confirm">
                                    <Form.Label>Password Confirmation</Form.Label>
                                    <Form.Control className="au-input au-input--full" type="password" ref={passConfirmRef} required />
                                </Form.Group>
                                <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit">register</Button>
                                <div class="social-login-content">
                                    <div class="social-button">
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20">register with facebook</Button>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20">register with twitter</Button>
                                    </div>
                                </div>
                            </Form>
                            <div className="register-link">
                                <p>
                                   Already have account?
                                   <Link to="/login">Log In</Link>
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