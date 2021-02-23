import React, { useRef, useState, Fragment, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import Header from '../layouts/Header'
import Content from '../sections/events/Content'
import Navmenu from '../layouts/Navmenu'
import HeaderMobile from '../layouts/HeaderMobile'
import { AuthProvider } from "../../Contexts/AuthContext"
import app from '../../firebase'
import { useAuth } from "../../Contexts/AuthContext";
import $ from 'jquery'
import jQuery from 'jquery'
import { main } from '../../assets/js/utils.js';

import { Form, Alert, Button } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import Swal from 'sweetalert2'

export default function Events() {

    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)
    const { logout, currentUser } = useAuth()

    const nameRef = useRef()
    const nameUpRef = useRef()
    const startRef = useRef()
    const startUpRef = useRef()
    const endRef = useRef()
    const endUpRef = useRef()
    const categoryRef = useRef()
    const idUpRef = useRef()
    const catUpRef = useRef()
    const idRef = useRef()
    const categoryUpRef = useRef()
    const selectedCategoryUpRef = useRef()
    const [error, setError] = useState('')
    const [errorAdd, setErrorAdd] = useState('')
    const [info, setInfo] = useState('')
    const [infoAdd, setInfoAdd] = useState('')
    const [active, setActive] = useState(1)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    main(jQuery, setError, logout, history)

    useEffect(() => {
        const fetchCategory = async () => {
            const db = app.firestore()
            const data = await db.collection("Categorie").get()
            setCategories(data.docs.map(doc => ({ Category: doc.data().Nom, id: doc.id })))
        }
        fetchCategory()
    }, [])

    console.log()

    async function handleUpdateEvent(e) {
        e.preventDefault()
        let temp = []
        categoryUpRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Category)
        });
        try {
            setError('')
            setInfo('')
            if (startUpRef.current.value < endUpRef.current.value) {
                const db = app.firestore()
                if (new Date(endUpRef.current.value).getTime() < new Date().getTime()) {
                    setActive(0)
                }
                db.collection('Events').doc(idUpRef.current.value).update({ Name: nameUpRef.current.value, Start: new Date(startUpRef.current.value), End: new Date(endUpRef.current.value), Category: temp, Active: active  })
                setInfo('Events named ' + nameUpRef.current.value + ' Up To Date')
                setIsButtonDisabled(true)
                setTimeout(() => setIsButtonDisabled(false), 5000);
                setTimeout(() => setInfo(''), 5000);
            }
            else {
                setError('the end date must be greater than the start date')
                setTimeout(() => setError(''), 5000);               
            }

        } catch (error) {

            console.log(error)

        }
        setLoading(false)
    }

    async function handleAddEvent(e) {
        e.preventDefault()
        let temp = []
        categoryRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Category)
        });

        try {

            setErrorAdd('')
            setInfoAdd('')
            const diff = new Date(startRef.current.value).getTime() - new Date().getTime()
            if (startRef.current.value < endRef.current.value) {
                if (diff >= 0) {
                    const db = app.firestore()
                    db.collection('Events').add({
                        Category: temp,
                        End: new Date(endRef.current.value),
                        Name: nameRef.current.value,
                        Start: new Date(startRef.current.value),
                        User: currentUser.uid,
                        Active: 1
                    });
                    setInfoAdd('Events named ' + nameRef.current.value + ' Added')
                    setIsButtonDisabled(true)
                    setTimeout(() => setIsButtonDisabled(false), 5000);
                    setTimeout(() => setInfoAdd(''), 5000);
                    document.getElementById("add-event-form").reset();
                    categoryRef.current.resetSelectedValues()
                }
                else {
                    setErrorAdd('the start date has already passed')
                }
            }
            else {
                setErrorAdd('the end date must be greater than the start date')
                setTimeout(() => setError(''), 5000);
            }

        } catch (error) {

            console.log(error)

        }
        setLoading(false)
    }

    async function handleDeleteEvent(e) {
        e.preventDefault()
        setError('')
        setInfo('')

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                
                if (result.value == true) {

                    try {

                        const db = app.firestore()
                        db.collection('Events').doc(idUpRef.current.value).delete();
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                        $("#update-events").modal("hide");

                    } catch (error) {

                        Swal.fire(
                            'Not Deleted!',
                            'Some problem has occurred.',
                            'error'
                        )
                        console.log(error)

                    }
                }
                else {
                    console.log('no')
                }
            })


        setLoading(false)
    }

    $('#update-events').on('shown.bs.modal', function (e) {
        e.preventDefault()
        const sc = catUpRef.current.value.split(",")
        let temp = []
        for (var i = 0; i < sc.length; i++) {
            temp.push({ Category: sc[i], id: i})
            
        }
        setSelectedCategory(temp)
    })
        return (
            <AuthProvider>
                <Fragment>
                    <MetaTags>
                        <title>Real Ads</title>
                        <meta
                            name="description"
                            content="#"
                        />
                    </MetaTags>
                    <div className="page-wrapper">
                        <HeaderMobile />
                        <Navmenu />
                        <div className="page-container">
                            <Header />
                            <Content />
                        </div>
                    </div>

                    <div className="modal fade" id="update-events" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h5 className="modal-title" id="update-event-modal-label"></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                            {error && <Alert variant="danger">{error}</Alert>}
                            {info && <Alert variant="info">{info}</Alert>}
                            <Form id="update-events-form" onSubmit={handleUpdateEvent}>
                                <Form.Group id="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control className="au-input au-input--full" id="nameInput" type="text" ref={nameUpRef} required />
                                </Form.Group>
                                <Form.Group id="id">
                                    <Form.Control className="au-input au-input--full" id="idInput" type="text" ref={idUpRef} hidden/>
                                </Form.Group>
                                <Form.Group id="start">
                                    <Form.Label>Start Date</Form.Label>
                                    <Form.Control className="au-input au-input--full" id="startInput" type="datetime-local" ref={startUpRef} required />
                                </Form.Group>
                                <Form.Group id="end">
                                    <Form.Label>End Date</Form.Label>
                                    <Form.Control className="au-input au-input--full" id="endInput" type="datetime-local" ref={endUpRef} required />
                                </Form.Group>
                                <Form.Group id="category">
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="catInput" type="text" ref={catUpRef} hidden />
                                            <Multiselect id="catInput" options={categories} displayValue={"Category"} selectedValues={selectedCategory} ref={categoryUpRef} />
                                </Form.Group>
                                <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={ isButtonDisabled }>Update Event</Button>
                                <div class="social-login-content">
                                    <div class="social-button">
                                                <Button className="au-btn--block m-b-20" variant="danger" onClick={handleDeleteEvent}>Delete Events</Button>
                                    </div>
                                </div>
                            </Form>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="modal fade" id="add-events" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="add-event-modal-label"></h5>
                                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorAdd && <Alert variant="danger">{errorAdd}</Alert>}
                                    {infoAdd && <Alert variant="info">{infoAdd}</Alert>}
                                    <Form id="add-event-form" onSubmit={handleAddEvent}>
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="au-input au-input--full" type="text" ref={nameRef} required />
                                        </Form.Group>
                                        <Form.Group id="start">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" type="datetime-local" ref={startRef} required />
                                        </Form.Group>
                                        <Form.Group id="end">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" type="datetime-local" ref={endRef} required />
                                        </Form.Group>
                                        <Form.Group id="category">
                                            <Form.Label>Categories</Form.Label>
                                            <Multiselect options={categories} displayValue={"Category"} ref={categoryRef} />
                                        </Form.Group>
                                        <Button disabled={loading} className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonDisabled} >Add Event</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            </AuthProvider>
        );
}