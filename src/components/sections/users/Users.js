import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";
import app from '../../../firebase'

import $ from 'jquery'

import { Alert } from "react-bootstrap"

export default function Users() {

    const { currentUser } = useAuth()
    const [blocked, setBlocked] = useState(true)

    const [users, setUsers] = useState([])
    const [active, setActive] = useState(0)
    const [lastDocUsers, setLastDocUsers] = useState([])
    const [usersLoading, setUsersLoading] = useState(false)
    const [usersIsEmpty, setUsersIsEmpty] = useState(false)

    const [error, setError] = useState('')
    const [info, setInfo] = useState('')

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

    useEffect(() => {
        const fetchUsers = async () => {
            const db = app.firestore()

            const doc = db.collection('Users').orderBy('Role', 'asc').limit(3);
            updateUsersState(doc)
        }
        fetchUsers()
    }, [])

    const updateUsersState = (doc, a) => {
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocUsers(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New User: ', change.doc.data());
                        let toggleRole = ''
                        if (change.doc.data().Role == 'ADMIN') {
                            toggleRole = 'CUSTOMER'
                        } else if (change.doc.data().Role == 'CUSTOMER') {
                            toggleRole = 'ADMIN'
                        }
                        if (change.doc.data().Active == 0) {
                            temp.push({ phone: change.doc.data().Phone, nom: change.doc.data().Name, role: change.doc.data().Role, email: change.doc.data().Email, active: 'activate', toggleTo: toggleRole, id: change.doc.id })
                        } else {
                            temp.push({ phone: change.doc.data().Phone, nom: change.doc.data().Name, role: change.doc.data().Role, email: change.doc.data().Email, active: 'desactivate', toggleTo: toggleRole, id: change.doc.id })
                        }

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified User: ', change.doc.data())
                        let toggleRole = ''
                        if (change.doc.data().Role == 'ADMIN') {
                            toggleRole = 'CUSTOMER'
                        } else if (change.doc.data().Role == 'CUSTOMER') {
                            toggleRole = 'ADMIN'
                        }
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].phone = change.doc.data().Phone
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].role = change.doc.data().Role
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].nom = change.doc.data().Name
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].email = change.doc.data().Email
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].toggleTo = toggleRole
                        if (change.doc.data().Active == 0) {
                            temp[temp.findIndex((obj => obj.id == change.doc.id))].active = 'activate'
                        } else {
                            temp[temp.findIndex((obj => obj.id == change.doc.id))].active = 'desactivate'
                        }
                        
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Faces: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1)

                    }

                });
                // ...
                if (a == 1) {
                    setUsers((faces) => [...users, ...temp])
                } else {
                    setUsers((faces) => [...temp])
                }

                //console.log(usersLoading)

            } else {
                setUsersIsEmpty(true)
            }
            setUsersLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    const fetchMoreUsers = () => {
        setUsersLoading(true)
        const db = app.firestore()

        const doc = db.collection('Users').orderBy('Role', 'asc').startAfter(lastDocUsers).limit(3);
        updateUsersState(doc, 1)

    }

    async function handleUpdateAd(role, user) {
        console.log("in")
        try {
            setError('')
            setInfo('')
                const db = app.firestore()
                db.collection('Users').doc(user).update({ Role: role })
                setInfo("User Up To Date")
                setTimeout(() => setInfo(''), 5000);
                setLastDocUsers([])
            
        } catch (error) {

            setError(error)

        }
    }

    async function handleAction(user, e) {
        e.preventDefault()
        const action = e.target.value;

        if (action == 'activate') {

        } else if (action == 'desactivate') {

        } else if (action == 'ADMIN' || action == 'CUSTOMER') {
            handleUpdateAd(action, user)
        } 

    }

    if (!blocked) {
        return <h3 style={{ textAlign: 'center', color: 'red' }}>Sorry you do not have permision</h3>
    }

    return (

    <>
        <div class="row">
                {error && <Alert variant="danger">{error}</Alert>}
                {info && <Alert variant="info">{info}</Alert>}
            <div style={{ width: "100%" }}>
                <div class="user-data m-b-30">
                    <h3 class="title-3 m-b-30">
                        <i class="zmdi zmdi-account-calendar"></i>user data</h3>
                    <div class="table-responsive table-data">
                        <table class="table">
                            <thead>
                                <tr>
                                    <td>name</td>
                                    <td>phone</td>
                                    <td>role</td>
                                    <td>action</td>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((item, index) => (
                                <>
                                <tr>
                                    <td>
                                        <div class="table-data__info">
                                            <h6>{ item.nom }</h6>
                                            <span>
                                                <a href="#">{ item.email }</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="table-data__info">
                                            <h6>{ item.phone }</h6>
                                        </div>
                                    </td>
                                    <td>
                                        <span class="role admin">{ item.role }</span>
                                    </td>
                                    <td>
                                        <div class="rs-select2--trans rs-select2--sm">
                                                <select class="js-select2" id="action_id" name="property" onChange={handleAction.bind(this, item.id)}>
                                                <option value="default">Action</option>
                                                <option value={ item.active }>{ item.active }</option>
                                                <option value={ item.toggleTo }> set to { item.toggleTo }</option>
                                            </select>
                                            <div class="dropDownSelect2"></div>
                                        </div>
                                    </td>
                                    </tr>
                                </>
                            ))}    
                            </tbody>
                        </table>
                    </div>
                    <div class="user-data__footer">
                            {usersLoading && <h4>loading</h4>}
                            {!usersLoading && !usersIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreUsers}>load more</button>}
                            {usersIsEmpty && <h4>no more users</h4>}
                    </div>
                </div>
            </div>
        </div>
     </>       

        );
}

