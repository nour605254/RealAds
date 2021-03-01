import React, { useRef, useState } from 'react'
import { useAuth } from "../../../Contexts/AuthContext"
import { Form, Alert, Button } from "react-bootstrap"

import { Link, useHistory } from 'react-router-dom'
import logo from '../../../assets/images/icon/logo.png'

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input'

import app from '../../../firebase'

export default function Register() {

        const emailRef = useRef()
        const nameRef = useRef()
        const passRef = useRef()
        const phoneRef = useRef()
        const passConfirmRef = useRef()
        const { signup, updatePhone } = useAuth()
        const [error, setError] = useState('')
        const [loading, setLoading] = useState(false)
        const [phone, setPhone] = useState()
        const history = useHistory()

        async function handleSubmit(e) {
            e.preventDefault()

            if (passRef.current.value !== passConfirmRef.current.value) {
                return setError('Password do not match')
            }

            try {
                setError('')
                if (isValidPhoneNumber(phone)) {
                    setLoading(true)
                    await signup(emailRef.current.value, passRef.current.value).then((userCredential) => {

                        userCredential.user.sendEmailVerification()
                            userCredential.user.updateProfile( {
                                displayName: nameRef.current.value,
                                phoneNumber: phone
                            })

                            //updatePhone(phone)
                            const db = app.firestore()
                            db.collection('Users').add({
                                Name: nameRef.current.value,
                                Phone: phone,
                                Role: 'CUSTOMER',
                                Email: userCredential.user.email,
                                Active: 0
                            })
                            history.push("/")
                    })
                    
                } else {
                    setError('Phone number is not valid')
                }
 
            } catch (error) {
                if (error.code == "auth/email-already-in-use") {
                    setError('Email already in use')
                }
                else if (error.code == "auth/weak-password") {
                    setError('Password min-lenght : 6')
                }
                else {
                    setError('Failed to register')
                }

                console.log(error)
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
                        <div id="recaptcha-container"></div>
                        <div className="login-form">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className="au-input au-input--full" type="text" ref={nameRef} required />
                                </Form.Group>
                                <Form.Group id="tel">
                                    <Form.Label>Phone</Form.Label>
                                    <PhoneInput className="au-input au-input--full" placeholder="Enter phone number" ref={phoneRef} onChange={setPhone} value={phone} required />
                                </Form.Group>
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