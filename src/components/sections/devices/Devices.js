import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";

import app from '../../../firebase'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import Swal from 'sweetalert2'

export default function Ads() {

    const [ets, setEts] = useState([])
    const [lastDocEts, setLastDocEts] = useState([])
    const [etsLoading, setEtsLoading] = useState(false)
    const [etsIsEmpty, setEtsIsEmpty] = useState(false)

    const [nodes, setNodes] = useState([])
    const [lastDocNodes, setLastDocNodes] = useState([])
    const [nodesLoading, setNodesLoading] = useState(false)
    const [nodesIsEmpty, setNodesIsEmpty] = useState(false)

    const [error, setError] = useState('')
    const [info, setInfo] = useState('')

    const { currentUser } = useAuth()
    const [blocked, setBlocked] = useState(true)

    // fetch User Role Query
    useEffect(() => {
        const fetchCategory = async () => {
            const db = app.firestore()
            const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
            dataUser.docs.forEach(
                doc => {
                    if (doc.data().Role == 'CUSTOMER') {
                        setBlocked(false)
                    }
                    else if (doc.data().Role == 'ADMIN') {
                        setBlocked(true)
                    }
                }
            )
        }
        fetchCategory()
    }, [])

    // fetch Ets Query
    useEffect(() => {
        const fetchEts = async () => {
            const db = app.firestore()
            let doc = ''
            const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
            dataUser.docs.forEach(
                docu => {
                    if (docu.data().Role == 'CUSTOMER') {
                        doc = db.collection('Ets').where('User', '==', currentUser.uid).orderBy('Nom', 'desc').limit(3);
                    }
                    else if (docu.data().Role == 'ADMIN') {
                        doc = db.collection('Ets').orderBy('Nom', 'desc').limit(3);
                    }
                }
            )
            updateEtsState(doc)
        }
        fetchEts()
    }, [])

    const updateEtsState = (doc,a) => {
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocEts(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Ets: ', change.doc.data());

                        temp.push({ name: change.doc.data().Nom, address: change.doc.data().Address, nodes: change.doc.data().Nodes, id: change.doc.id })

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified Ets: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].name = change.doc.data().Nom
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].address = change.doc.data().Address
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].nodes = change.doc.data().Nodes
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Category: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1)

                    }

                });
                // ...

                if (a == 1) {
                    setEts((ets) => [...ets, ...temp])
                } else {
                    setEts((ets) => [...temp])
                }
                //console.log(temp)

            } else {
                setEtsIsEmpty(true)
            }
            setEtsLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    const fetchMoreEts = async () => {
        setEtsLoading(true)
        const db = app.firestore()

        let doc = ''
        const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
        dataUser.docs.forEach(
            docu => {
                if (docu.data().Role == 'CUSTOMER') {
                    doc = db.collection('Ets').where('User', '==', currentUser.uid).orderBy('Nom', 'desc').startAfter(lastDocEts).limit(3);
                }
                else if (docu.data().Role == 'ADMIN') {
                    doc = db.collection('Ets').orderBy('Nom', 'desc').startAfter(lastDocEts).limit(3);
                }
            }
        )
        updateEtsState(doc,1)

    }

    async function handleDeleteEt(id, e) {
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
                    db.collection('Ets').doc(id).delete();
                    Swal.fire(
                        'Deleted!',
                        'Ets has been deleted.',
                        'success'
                    )

                } catch (error) {

                    Swal.fire(
                        'Not Deleted!',
                        'Some problem has occurred.',
                        'error'
                    )
                    console.log(error)

                }
            }

        })

    }

    async function handleAddEt(e) {
        e.preventDefault()
        $("#add-et").modal("show");

    }

    async function handleUpdateEt(id, name, address, nodes, e) {
        e.preventDefault()
        $("#update-et").modal("show");
        $("#update-et-modal-label").html("Update Et " + id)
        document.getElementById("idUpdateEtInput").value = id
        document.getElementById("nameUpdateEtInput").value = name
        document.getElementById("adUpdateEtInput").value = address
        document.getElementById("noUpdateEtInput").value = nodes
    }

    // fetch Nodes Query

    useEffect(() => {
        const fetchNodes = async () => {
            const db = app.firestore()
            let doc = ''
            const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
            dataUser.docs.forEach(
                docu => {
                    if (docu.data().Role == 'CUSTOMER') {
                        doc = db.collection('Nodes').where('User', '==', currentUser.uid).orderBy('Nom', 'desc').limit(4);
                    }
                    else if (docu.data().Role == 'ADMIN') {
                        doc = db.collection('Nodes').orderBy('Nom', 'desc').limit(4);
                    }
                }
            )
            updateNodesState(doc)
        }
        fetchNodes()
    }, [])

    const updateNodesState = (doc,a) => {
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocNodes(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Node: ', change.doc.data());

                        temp.push({ seuil: change.doc.data().Seuil, nom: change.doc.data().Nom, id: change.doc.id })

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified Node: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].seuil = change.doc.data().Seuil
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].nom = change.doc.data().Nom
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Node: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1)

                    }

                });
                // ...
                if (a == 1) {
                    setNodes((nodes) => [...nodes, ...temp])
                } else {
                    setNodes((nodes) => [...temp])
                }
                
                //console.log(nodesLoading)

            } else {
                setNodesIsEmpty(true)
            }
            setNodesLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    const fetchMoreNodes = async () => {
        setNodesLoading(true)
        const db = app.firestore()

        let doc = ''
        const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
        dataUser.docs.forEach(
            docu => {
                if (docu.data().Role == 'CUSTOMER') {
                    doc = db.collection('Nodes').where('User', '==', currentUser.uid).orderBy('Nom', 'desc').startAfter(lastDocNodes).limit(3);
                }
                else if (docu.data().Role == 'ADMIN') {
                    doc = db.collection('Nodes').orderBy('Nom', 'desc').startAfter(lastDocNodes).limit(3);
                }
            }
        )
        updateNodesState(doc,1)

    }

    async function handleDeleteNode(id, e) {
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
                    db.collection('Nodes').doc(id).delete();
                    Swal.fire(
                        'Deleted!',
                        'Node has been deleted.',
                        'success'
                    )

                } catch (error) {

                    Swal.fire(
                        'Not Deleted!',
                        'Some problem has occurred.',
                        'error'
                    )
                    console.log(error)

                }
            }

        })

    }

    async function handleAddNode(e) {
        e.preventDefault()
        $("#add-node").modal("show");
    }

    async function handleUpdateNode(id, nom, seuil, e) {
        e.preventDefault()
        $("#update-node").modal("show");
        $("#update-node-modal-label").html("Update Node " + id)
        document.getElementById("idUpdateNodeInput").value = id
        document.getElementById("nameUpdateNodeInput").value = nom
        document.getElementById("thUpdateNodeInput").value = seuil
    }

 

    return (

    <>
        <div className="row">
            <div className="col-md-12">
                <h3 className="title-5 m-b-35">Ets</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left"></div>
                    {!blocked &&
                        <div className="table-data__tool-right">
                                <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={handleAddEt}>
                                <i className="zmdi zmdi-plus"></i>
                            add Ets
                        </button>
                        </div>
                    }
                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Nodes</th>
                                <th>Address</th>
                                {!blocked &&
                                    <th></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {ets.map((item, index) => (
                                <>
                                    <tr className="tr-shadow">
                                        <td>{ item.name }</td>
                                        <td>
                                            <span className="block-email">{ item.nodes.join(' - ') }</span>
                                        </td>
                                        <td>{item.address}</td>
                                        {!blocked &&
                                            <td>
                                                <div className="table-data-feature">
                                                    <button className="item" onClick={handleUpdateEt.bind(this, item.id, item.name, item.address, item.nodes)} data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button className="item" onClick={handleDeleteEt.bind(this, item.id)} data-toggle="tooltip" data-placement="top" title="Delete">
                                                        <i className="zmdi zmdi-delete"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                    <tr class="spacer"></tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div class="user-data__footer">
                        {etsLoading && <h4>loading</h4>}
                        {!etsLoading && !etsIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreEts}>load more</button>}
                        {etsIsEmpty && <h4>no more ets</h4>}
                    </div>
            </div>
            </div>
            <br />
        <div className="row">
            <div className="col-md-12">
                <h3 className="title-5 m-b-35">Nodes</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left"></div>
                    {!blocked &&
                        <div className="table-data__tool-right">
                            <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={handleAddNode}>
                                <i className="zmdi zmdi-plus"></i>
                        add node
                    </button>
                        </div>
                    }
                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Threshold</th>
                                {!blocked &&
                                    <th></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {nodes.map((item, index) => (
                                <>
                                    <tr className="tr-shadow">
                                        <td>{ item.nom }</td>
                                        <td className="desc">{item.seuil}</td>
                                        {!blocked &&
                                            <td>
                                                <div className="table-data-feature">
                                                    <button className="item" onClick={handleUpdateNode.bind(this, item.id, item.nom, item.seuil)} data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button className="item" onClick={handleDeleteNode.bind(this, item.id)} data-toggle="tooltip" data-placement="top" title="Delete">
                                                        <i className="zmdi zmdi-delete"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        }
                                    </tr>
                                    <tr class="spacer"></tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div class="user-data__footer">
                        {nodesLoading && <h4>loading</h4>}
                        {!nodesLoading && !nodesIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreNodes}>load more</button>}
                        {nodesIsEmpty && <h4>no more nodes</h4>}
                    </div>
            </div>
        </div>
     </>       

        );
}

