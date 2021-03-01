import React, { useRef, useState, useEffect, Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Header from '../layouts/Header';
import Content from '../sections/devices/Content';
import Footer from '../layouts/Footer';
import Navmenu from '../layouts/Navmenu';
import HeaderMobile from '../layouts/HeaderMobile';
import { AuthProvider } from "../../Contexts/AuthContext"
import app from '../../firebase'
import $ from 'jquery'
import jQuery from 'jquery'

import { Form, Alert, Button } from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom'
import { Multiselect } from 'multiselect-react-dropdown'
import Swal from 'sweetalert2'
import Select from 'react-select'

import ReactPlayer from "react-player";

import { useAuth } from "../../Contexts/AuthContext";

export default function Devices() {

    const { currentUser } = useAuth()
    const [nodes, setNodes] = useState([])
    const [selectedNodes, setSelectedNodes] = useState([])

    const [isButtonAddEtDisabled, setIsButtonAddEtDisabled] = useState(false)
    const [isButtonUpdateEtDisabled, setIsButtonUpdateEtDisabled] = useState(false)
    const [isButtonAddNodeDisabled, setIsButtonAddNodeDisabled] = useState(false)
    const [isButtonUpdateNodeDisabled, setIsButtonUpdateNodeDisabled] = useState(false)

    const nameAddEtRef = useRef()
    const idAddEtRef = useRef()
    const adAddEtRef = useRef()
    const noAddEtRef = useRef()
    const nodeAddEtRef = useRef()

    const nameUpdateEtRef = useRef()
    const idUpdateEtRef = useRef()
    const adUpdateEtRef = useRef()
    const noUpdateEtRef = useRef()
    const nodeUpdateEtRef = useRef()

    const nameAddNodeRef = useRef()
    const idAddNodeRef = useRef()
    const thAddNodeRef = useRef()

    const nameUpdateNodeRef = useRef()
    const idUpdateNodeRef = useRef()
    const thUpdateNodeRef = useRef()

    const [errorAddEt, setErrorAddEt] = useState('')
    const [infoAddEt, setInfoAddEt] = useState('')

    const [errorUpdateEt, setErrorUpdateEt] = useState('')
    const [infoUpdateEt, setInfoUpdateEt] = useState('')

    const [errorAddNode, setErrorAddNode] = useState('')
    const [infoAddNode, setInfoAddNode] = useState('')

    const [errorUpdateNode, setErrorUpdateNode] = useState('')
    const [infoUpdateNode, setInfoUpdateNode] = useState('')

    useEffect(() => {
        const fetchNodes = async () => {
            const db = app.firestore()
            const data = await db.collection("Nodes").get()
            setNodes(data.docs.map(doc => ({ Node: doc.data().Nom, id: doc.id })))
        }
        fetchNodes()
    }, [])

    async function handleAddEt(e) {
        e.preventDefault()
        let temp = []
        nodeAddEtRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Node)
        });

        try {

            setErrorAddEt('')
            setInfoAddEt('')

                    const db = app.firestore()
                    db.collection('Ets').add({
                        Nom: nameAddEtRef.current.value,
                        Address: adAddEtRef.current.value,
                        Nodes: temp,
                        User: currentUser.id,
                    });
                    setInfoAddEt('Ets named ' + nameAddEtRef.current.value + ' Added')
                    setIsButtonAddEtDisabled(true)
                    setTimeout(() => setIsButtonAddEtDisabled(false), 5000);
                    setTimeout(() => setInfoAddEt(''), 5000);
                    document.getElementById("add-et-form").reset();
                    nodeAddEtRef.current.resetSelectedValues()

        } catch (error) {

            console.log(error)

        }
    }

    async function handleUpdateEt(e) {
        e.preventDefault()
        let temp = []
        nodeUpdateEtRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Node)
        });
        try {
            setErrorUpdateEt('')
            setInfoUpdateEt('')
                const db = app.firestore()
                db.collection('Ets').doc(idUpdateEtRef.current.value).update({ Nom: nameUpdateEtRef.current.value, Nodes: temp, Address: adUpdateEtRef.current.value })
                setInfoUpdateEt(nameUpdateEtRef.current.value + " Up To Date")
                setIsButtonUpdateEtDisabled(true)
                setTimeout(() => setIsButtonUpdateEtDisabled(false), 5000);
                setTimeout(() => setInfoUpdateEt(''), 5000);

        } catch (error) {

            console.log(error)

        }
    }

    $('#update-et').unbind().on('shown.bs.modal', function (e) {
        e.preventDefault()
        const sc = noUpdateEtRef.current.value.split(",")
        let temp = []
        for (var i = 0; i < sc.length; i++) {
            temp.push({ Node: sc[i], id: i })

        }
        setSelectedNodes(temp)
    })

    async function handleCloseUpdateEt(e) {
        e.preventDefault()
        $("#update-et").modal("hide");
    }

    async function handleAddNode(e) {
        e.preventDefault()

        try {

            setErrorAddNode('')
            setInfoAddNode('')

            const db = app.firestore()
            db.collection('Nodes').add({
                Nom: nameAddNodeRef.current.value,
                Seuil: thAddNodeRef.current.value,
                User: currentUser.id,
            });
            setInfoAddNode('Node named ' + nameAddNodeRef.current.value + ' Added')
            setIsButtonAddNodeDisabled(true)
            setTimeout(() => setIsButtonAddNodeDisabled(false), 5000);
            setTimeout(() => setInfoAddNode(''), 5000);
            document.getElementById("add-node-form").reset();

        } catch (error) {

            console.log(error)

        }
    }

    async function handleUpdateNode(e) {
        e.preventDefault()
        try {
            setErrorUpdateNode('')
            setInfoUpdateNode('')
            const db = app.firestore()
            db.collection('Nodes').doc(idUpdateNodeRef.current.value).update({ Nom: nameUpdateNodeRef.current.value, Seuil: thUpdateNodeRef.current.value })
            setInfoUpdateNode(nameUpdateNodeRef.current.value + " Up To Date")
            setIsButtonUpdateNodeDisabled(true)
            setTimeout(() => setIsButtonUpdateNodeDisabled(false), 5000);
            setTimeout(() => setInfoUpdateNode(''), 5000);

        } catch (error) {

            console.log(error)

        }
    }

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
                <div class="page-wrapper">
                    <HeaderMobile />
                    <Navmenu />
                    <div class="page-container">
                        <Header />
                        <Content />
                    </div>
                </div>

                <div className="modal fade" id="add-et" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Add Et </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {errorAddEt && <Alert variant="danger">{errorAddEt}</Alert>}
                                {infoAddEt && <Alert variant="info">{infoAddEt}</Alert>}
                                <Form id="add-et-form" onSubmit={handleAddEt}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="nameAddEtInput" type="text" ref={nameAddEtRef} required />
                                    </Form.Group>
                                    <Form.Group id="id">
                                        <Form.Control className="au-input au-input--full" id="idAddEtInput" type="text" ref={idAddEtRef} hidden />
                                    </Form.Group>
                                    <Form.Group id="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="adAddEtInput" type="text" ref={adAddEtRef} required />
                                    </Form.Group>
                                    <Form.Group id="node">
                                        <Form.Label>Nodes</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="noAddEtInput" type="text" ref={noAddEtRef} hidden />
                                        <Multiselect id="noAddEtInput" options={nodes} displayValue={"Node"} ref={nodeAddEtRef} />
                                    </Form.Group>
                                    <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddEtDisabled}>Add Et</Button>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="update-et" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="update-et-modal-label"> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {errorUpdateEt && <Alert variant="danger">{errorUpdateEt}</Alert>}
                                {infoUpdateEt && <Alert variant="info">{infoUpdateEt}</Alert>}
                                <Form id="update-et-form" onSubmit={handleUpdateEt}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="nameUpdateEtInput" type="text" ref={nameUpdateEtRef} required />
                                    </Form.Group>
                                    <Form.Group id="id">
                                        <Form.Control className="au-input au-input--full" id="idUpdateEtInput" type="text" ref={idUpdateEtRef} hidden />
                                    </Form.Group>
                                    <Form.Group id="address">
                                        <Form.Label>Address</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="adUpdateEtInput" type="text" ref={adUpdateEtRef} required />
                                    </Form.Group>
                                    <Form.Group id="node">
                                        <Form.Label>Nodes</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="noUpdateEtInput" type="text" ref={noUpdateEtRef} hidden />
                                        <Multiselect id="noUpdateEtInput" options={nodes} displayValue={"Node"} selectedValues={selectedNodes} ref={nodeUpdateEtRef} />
                                    </Form.Group>
                                    <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonUpdateEtDisabled}>Update Et</Button>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateEt} data-dismiss="modal">X</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="add-node" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> Add Node </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {errorAddNode && <Alert variant="danger">{errorAddNode}</Alert>}
                                {infoAddNode && <Alert variant="info">{infoAddNode}</Alert>}
                                <Form id="add-node-form" onSubmit={handleAddNode}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="nameAddNodeInput" type="text" ref={nameAddNodeRef} required />
                                    </Form.Group>
                                    <Form.Group id="id">
                                        <Form.Control className="au-input au-input--full" id="idAddNodeInput" type="text" ref={idAddNodeRef} hidden />
                                    </Form.Group>
                                    <Form.Group id="seuil">
                                        <Form.Label>Threshold</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="thAddNodeInput" type="number" ref={thAddNodeRef} required />
                                    </Form.Group>
                                    <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddNodeDisabled}>Add Node</Button>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="update-node" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="update-node-modal-label"> </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {errorUpdateNode && <Alert variant="danger">{errorUpdateNode}</Alert>}
                                {infoUpdateNode && <Alert variant="info">{infoUpdateNode}</Alert>}
                                <Form id="update-node-form" onSubmit={handleUpdateNode}>
                                    <Form.Group id="name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="nameUpdateNodeInput" type="text" ref={nameUpdateNodeRef} required />
                                    </Form.Group>
                                    <Form.Group id="id">
                                        <Form.Control className="au-input au-input--full" id="idUpdateNodeInput" type="text" ref={idUpdateNodeRef} hidden />
                                    </Form.Group>
                                    <Form.Group id="seuil">
                                        <Form.Label>Threshold</Form.Label>
                                        <Form.Control className="au-input au-input--full" id="thUpdateNodeInput" type="number" ref={thUpdateNodeRef} required />
                                    </Form.Group>
                                    <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonUpdateNodeDisabled}>Update Node</Button>
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