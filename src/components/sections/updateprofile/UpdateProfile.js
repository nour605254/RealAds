import React, { useRef, useState } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import { Form, Alert, Button } from "react-bootstrap";

import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/images/icon/logo.png';

export default function UpdateProfile() {

    const emailRef = useRef()
    const passRef = useRef()
    const passConfirmRef = useRef()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const { currentUser, updateEmail, updatePassword } = useAuth()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()

        if (passRef.current.value !== passConfirmRef.current.value) {
            return setError('Password do not match')
        }

        const promises = []
        setLoading(true)
        setError("")

        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }

        if (passRef.current.value) {
            promises.push(updatePassword(passRef.current.value))
        }

        Promise.all(promises).then(() => {
            history.push("/")
        }).catch(() => {
            setError('Failed to update profile')
        }).finally(() => {

        })

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
                                            <Form.Group id="password">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control className="au-input au-input--full" type="password" ref={passRef} />
                                            </Form.Group>
                                            <Form.Group id="password-confirm">
                                                <Form.Label>Password Confirmation</Form.Label>
                                                <Form.Control className="au-input au-input--full" type="password" ref={passConfirmRef} />
                                            </Form.Group>
                                            <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit">Update</Button>
                                        </div>
                                    </Form>
                                    <div className="login-link">
                                        <p>
                                            <Link to="/">Back Home</Link>
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