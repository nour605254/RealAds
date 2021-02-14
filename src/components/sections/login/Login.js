import React, { useRef, useState } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import { Form, Alert, Button } from "react-bootstrap";

import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/images/icon/logo.png';

export default function Login() {

    const emailRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState('')
    const { login } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passRef.current.value)
            history.push("/")
        } catch {
            setError('Failed to sign in')
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
                                        <img src={logo} alt="CoolAdmin" />
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
                                <div className="login-checkbox">
                                    <label>
                                        <input type="checkbox" name="remember" />Remember Me
                                    </label>
                                    <label>
                                        <Link to="/recover">Forgotten Password?</Link>
                                    </label>
                                </div>
                                <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit">Log In</Button>
                                <div class="social-login-content">
                                    <div class="social-button">
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20">log in with facebook</Button>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20">log in with twitter</Button>
                                    </div>
                                </div>
                            </Form>
                            <div className="register-link">
                                <p>
                                            Don't you have account?
                                            <Link to="/register">Sign Up Here</Link>
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