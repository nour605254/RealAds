import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";

import app from '../../../firebase'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery';
import Swal from 'sweetalert2'

export default function Ads() {

    const { currentUser } = useAuth()
    const [blocked, setBlocked] = useState(true)

    const [ads, setAds] = useState([])
    const [lastDocAds, setLastDocAds] = useState([])
    const [adsLoading, setAdsLoading] = useState(false)
    const [adsIsEmpty, setAdsIsEmpty] = useState(false)

    const [categories, setCategories] = useState([])
    const [lastDocCats, setLastDocCats] = useState([])
    const [catsLoading, setCatsLoading] = useState(false)
    const [catsIsEmpty, setCatsIsEmpty] = useState(false)

    const [faces, setFaces] = useState([])
    const [lastDocFaces, setLastDocFaces] = useState([])
    const [facesLoading, setFacesLoading] = useState(false)
    const [facesIsEmpty, setFacesIsEmpty] = useState(false)

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

    // fetch Categories Query
    useEffect(() => {
        const fetchCategory = async () => {
            const db = app.firestore()
            const doc = db.collection('Categorie').orderBy('Nom', 'desc').limit(3);
            updateCatsState(doc)
        }
        fetchCategory()
    }, [])

    const updateCatsState = (doc,a) => {
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocCats(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Category: ', change.doc.data());

                        temp.push({ name: change.doc.data().Nom, faces: change.doc.data().Visages, id: change.doc.id })

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified Category: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].name = change.doc.data().Nom
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].faces = change.doc.data().Visages
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Category: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1)

                    }

                });
                // ...

                if (a == 1) {
                    setCategories((categories) => [...categories, ...temp])
                } else {
                    setCategories((categories) => [...temp])
                }
                //console.log(temp)

            } else {
                setCatsIsEmpty(true)
            }
            setCatsLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    const fetchMoreCats = () => {
        setCatsLoading(true)
        const db = app.firestore()

        const doc = db.collection('Categorie').orderBy('Nom', 'desc').startAfter(lastDocCats).limit(3);
        updateCatsState(doc,1)

    }

    async function handleDeleteCat(id, e) {
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
                    db.collection('Categorie').doc(id).delete();
                    Swal.fire(
                        'Deleted!',
                        'Categorie has been deleted.',
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

    async function handleAddCat(e) {
        e.preventDefault()
        $("#add-cat").modal("show");

    }

    async function handleUpdateCat(id, name, faces, e) {
        e.preventDefault()
        $("#update-cat").modal("show");
        $("#update-cat-modal-label").html("Update Category " + id)
        document.getElementById("idUpdateCatInput").value = id
        document.getElementById("nameUpdateCatInput").value = name
        document.getElementById("faUpdateCatInput").value = faces
    }

    // fetch Faces Query

    useEffect(() => {
        const fetchFace = async () => {
            const db = app.firestore()

            const doc = db.collection('Visages').orderBy('Nom', 'desc').limit(3);
            updateFacesState(doc)
        }
        fetchFace()
    }, [])

    const updateFacesState = (doc,a) => {
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocFaces(querySnapshot.docs[querySnapshot.docs.length - 1])
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Faces: ', change.doc.data());

                        temp.push({ age: change.doc.data().Age, nom: change.doc.data().Nom, sexe: change.doc.data().Sexe, id: change.doc.id })

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified Faces: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].age = change.doc.data().Age
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].sexe = change.doc.data().Sexe
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].nom = change.doc.data().Nom
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Faces: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1)

                    }

                });
                // ...
                if (a == 1) {
                    setFaces((faces) => [...faces, ...temp])
                } else {
                    setFaces((faces) => [...temp])
                }
                
                //console.log(facesLoading)

            } else {
                setFacesIsEmpty(true)
            }
            setFacesLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });

    }

    const fetchMoreFaces = () => {
        setFacesLoading(true)
        const db = app.firestore()

        const doc = db.collection('Visages').orderBy('Nom', 'desc').startAfter(lastDocFaces).limit(3);
        updateFacesState(doc,1)

    }

    async function handleDeleteFace(id, e) {
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
                    db.collection('Visages').doc(id).delete();
                    Swal.fire(
                        'Deleted!',
                        'Face has been deleted.',
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

    async function handleAddFace(e) {
        e.preventDefault()
        $("#add-face").modal("show");
    }

    async function handleUpdateFace(id, nom, sexe, age, e) {
        e.preventDefault()
        $("#update-face").modal("show");
        $("#update-face-modal-label").html("Update Face " + id)
        document.getElementById("idUpdateFaceInput").value = id
        document.getElementById("nameUpdateFaceInput").value = nom
        document.getElementById("geUpdateFaceInput").value = sexe
        document.getElementById("agUpdateFaceInput").value = age
    }

    // fetch Ads Query

    useEffect(() => {
        const fetchAds = async () => {
            const db = app.firestore()
            const data = await db.collection("Ads").get()

            data.docs.forEach(
                doc => {
                    if (new Date(doc.data().Fin.toDate()).getTime() > new Date().getTime()) {
                        db.collection('Ads').doc(doc.id).update({ Active: 1 })
                    }
                    else {
                        db.collection('Ads').doc(doc.id).update({ Active: 0 })
                    }
                }
            )

            const doc = db.collection('Ads').orderBy('Debut', 'desc').limit(3);

            updateAdsState(doc)

        }
        fetchAds()
    }, [])

    const updateAdsState = (doc,a) => {       
        let temp = []
        doc.onSnapshot(querySnapshot => {

            const isCollectionEmpty = querySnapshot.size === 0

            if (!isCollectionEmpty) {
                // get the last doc of query

                setLastDocAds(querySnapshot.docs[querySnapshot.docs.length - 1])

                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Ads: ', change.doc.data());

                        if (change.doc.data().Active == 1) {
                            if (change.doc.data().Debut.toDate().getDay() == new Date().getDay() || change.doc.data().Fin.toDate().getDay() == new Date().getDay()) {
                                temp.push({ id: change.doc.id, owner: change.doc.data().Proprietaire, start: change.doc.data().Debut.toDate(), end: change.doc.data().Fin.toDate(), category: change.doc.data().Categorie, touched: change.doc.data().Touche, view: change.doc.data().Vues, url: change.doc.data().url_fichier, visibility: 'checked' })
                            } else {
                                temp.push({ id: change.doc.id, owner: change.doc.data().Proprietaire, start: change.doc.data().Debut.toDate(), end: change.doc.data().Fin.toDate(), category: change.doc.data().Categorie, touched: change.doc.data().Touche, view: change.doc.data().Vues, url: change.doc.data().url_fichier, visibility: 'checked' })
                            }
                        }
                        else if (change.doc.data().Active == 0) {
                            temp.push({ id: change.doc.id, owner: change.doc.data().Proprietaire, start: change.doc.data().Debut.toDate(), end: change.doc.data().Fin.toDate(), category: change.doc.data().Categorie, touched: change.doc.data().Touche, view: change.doc.data().Vues, url: change.doc.data().url_fichier, visibility: '' })
                        }

                    }
                    if (change.type === 'modified') {
                        // console.log('Modified Ads: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].owner = change.doc.data().Proprietaire
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].start = change.doc.data().Debut.toDate()
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].end = change.doc.data().Fin.toDate()
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].category = change.doc.data().Categorie
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].view = change.doc.data().Vues
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].touched = change.doc.data().Touche
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].url = change.doc.data().url_fichier
                        if (change.doc.data().Active == 0) {
                            temp[temp.findIndex((obj => obj.id == change.doc.id))].visibility = ''
                        } else if (change.doc.data().Active == 1) {
                            if (change.doc.data().Debut.toDate().getDay() == new Date().getDay() || change.doc.data().Fin.toDate().getDay() == new Date().getDay()) {
                                temp[temp.findIndex((obj => obj.id == change.doc.id))].visibility = 'checked'
                            }
                            else {
                                temp[temp.findIndex((obj => obj.id == change.doc.id))].visibility = 'checked'
                            }
                        }


                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Ads: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1);

                    }

                });
                // ...
                if (a == 1) {
                    setAds((ads) => [...ads, ...temp])
                } else {
                    setAds((ads) => [...temp])
                }
                
                //console.log(temp)
            } else {
                setAdsIsEmpty(true)
            }
            setAdsLoading(false)
        }, err => {
            console.log(`Encountered error: ${err}`);
        });
        
    }

    const fetchMoreAds = () => {
        setAdsLoading(true)
        const db = app.firestore()

        const doc = db.collection('Ads').orderBy('Debut', 'desc').startAfter(lastDocAds).limit(3);
        updateAdsState(doc,1)

    }

    async function handleDeleteAd(id, e) {
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
                    db.collection('Ads').doc(id).delete();
                    Swal.fire(
                        'Deleted!',
                        'Ad has been deleted.',
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

    async function handleAddAd(e) {
        e.preventDefault()
        $("#add-ad").modal("show");

    }

    async function handleUpdateAd(id, owner, start, end, category, e) {
        e.preventDefault()
        $("#update-ad").modal("show");
        $("#update-ad-modal-label").html("Update Ad " + id)
        document.getElementById("idUpdateAdInput").value = id
        document.getElementById("ownerUpdateAdInput").value = owner
        document.getElementById("startUpdateAdInput").value = start.toISOString().substring(0, start.toISOString().length - 1)
        document.getElementById("endUpdateAdInput").value = end.toISOString().substring(0, end.toISOString().length - 1)
        document.getElementById("catUpdateAdInput").value = category
    }

    async function handleSetUrlAd(id, e) {
        e.preventDefault()
        $("#add-ad-url").modal("show");
        document.getElementById("idAddAdUrlInput").value = id
    }
    async function handleShowAd(url, e) {
        e.preventDefault()
        $("#view-ad-video").modal("show");
        document.getElementById("urlShowVideo").value = url
    }

    async function handleChangeVisibility(e) {
        e.preventDefault()
        
    }



    /*if (ads.length == 0 || categories.length == 0 || faces.length == 0) {
        return <h1>Loading ...</h1>
    }
    */
    return (

    <>
        <div className="row">
            <div className="col-md-12">
                <h3 className="title-5 m-b-35">Advertising</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left"></div>
                    {blocked && 
                        <div className="table-data__tool-right">
                                <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={handleAddAd}>
                                <i className="zmdi zmdi-plus"></i>
                                add ad
                            </button>
                        </div>
                    }

                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Visibility</th>
                                <th>Owner</th>
                                <th>Satrt</th>
                                <th>End</th>
                                <th>Touched</th>
                                <th>Views</th>
                                <th>Categories</th>
                                {blocked && 
                                    <>
                                        <th></th>
                                        <th></th>
                                    </>
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {ads.map((item, index) => (
                                <>
                                <tr className="tr-shadow">
                                    <td>
                                            <label className="au-checkbox">
                                                <input type="checkbox" checked={item.visibility} onChange={ handleChangeVisibility } />
                                            <span className="au-checkmark"></span>
                                        </label>
                                    </td>
                                    <td>{ item.owner }</td>
                                    <td>{item.start.toISOString().substring(0, item.start.toISOString().length - 8).split('T').join(' ') }</td>
                                    <td>{item.end.toISOString().substring(0, item.start.toISOString().length - 8).split('T').join(' ') }</td>
                                    <td className="desc">{ item.touched }</td>
                                    <td>
                                            <span className="status--process">{ item.view }</span>
                                    </td>
                                    <td>
                                        <span className="block-email">{ item.category.join(' - ') }</span>
                                    </td>
                                    <td>
                                        <div className="table-data-feature">
                                                <button className="item" data-toggle="tooltip" data-placement="top" title="Set Ad File" onClick={handleSetUrlAd.bind(this, item.id)}>
                                                <i className="zmdi zmdi-link"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-data-feature">
                                                <button className="item" onClick={handleUpdateAd.bind(this, item.id, item.owner, item.start, item.end, item.category)} data-toggle="tooltip" data-placement="top" title="Edit">
                                            <i className="zmdi zmdi-edit"></i>
                                            </button>
                                                <button className="item" onClick={handleShowAd.bind(this, item.url)} data-toggle="tooltip" data-placement="top" title="Show Ads">
                                                <i className="zmdi zmdi-collection-folder-image"></i>
                                            </button>
                                            <button className="item" onClick={handleDeleteAd.bind(this, item.id)} data-toggle="tooltip" data-placement="top" title="Delete">
                                            <i className="zmdi zmdi-delete"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="spacer"></tr>
                                </>
                            ))}                           
                        </tbody>
                    </table>
                </div>
                    <div class="user-data__footer">
                        {adsLoading && <h4>loading</h4>}
                        {!adsLoading && !adsIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreAds}>load more</button>}
                        {adsIsEmpty && <h4>no more ads</h4>}
                    </div>
            </div>
            </div>
            <br/>
        <div className="row">
            <div className="col-md-12">
                <h3 className="title-5 m-b-35">Categories</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left"></div>
                    {blocked &&
                        <div className="table-data__tool-right">
                                <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={handleAddCat}>
                                <i className="zmdi zmdi-plus"></i>
                            add category
                        </button>
                        </div>
                    }
                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Faces</th>
                                {blocked && 
                                    <th></th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((item, index) => (
                                <>
                                    <tr className="tr-shadow">
                                        <td>{ item.name }</td>
                                        <td>
                                            <span className="block-email">{ item.faces.join(' - ') }</span>
                                        </td>
                                        {blocked &&
                                            <td>
                                                <div className="table-data-feature">
                                                    <button className="item" onClick={handleUpdateCat.bind(this, item.id, item.name, item.faces)} data-toggle="tooltip" data-placement="top" title="Edit">
                                                        <i className="zmdi zmdi-edit"></i>
                                                    </button>
                                                    <button className="item" onClick={handleDeleteCat.bind(this, item.id)} data-toggle="tooltip" data-placement="top" title="Delete">
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
                        {catsLoading && <h4>loading</h4>}
                        {!catsLoading && !catsIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreCats}>load more</button>}
                        {catsIsEmpty && <h4>no more categories</h4>}
                    </div>
            </div>
            </div>
            <br />
        {blocked &&
            <div className="row">
            <div className="col-md-12">
                <h3 className="title-5 m-b-35">Faces</h3>
                <div className="table-data__tool">
                    <div className="table-data__tool-left"></div>
                    <div className="table-data__tool-right">
                        <button className="au-btn au-btn-icon au-btn--green au-btn--small" onClick={handleAddFace}>
                            <i className="zmdi zmdi-plus"></i>
                            add face
                        </button>
                    </div>
                </div>
                <div className="table-responsive table-responsive-data2">
                    <table className="table table-data2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Gender</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {faces.map((item, index) => (
                                <>
                                    <tr className="tr-shadow">
                                        <td>{ item.nom }</td>
                                        <td>
                                            <span className="block-email">{ item.age.join(' - ') }</span>
                                        </td>
                                        <td className="desc">{item.sexe}</td>
                                        <td>
                                            <div className="table-data-feature">
                                                <button className="item" onClick={handleUpdateFace.bind(this, item.id, item.nom, item.sexe, item.age)} data-toggle="tooltip" data-placement="top" title="Edit">
                                                    <i className="zmdi zmdi-edit"></i>
                                                </button>
                                                <button className="item" onClick={handleDeleteFace.bind(this, item.id, item.nom, item.age, item.sexe)} data-toggle="tooltip" data-placement="top" title="Delete">
                                                    <i className="zmdi zmdi-delete"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr class="spacer"></tr>
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                    <div class="user-data__footer">
                        {facesLoading && <h4>loading</h4>}
                        {!facesLoading && !facesIsEmpty && <button id="adsLoad" class="au-btn au-btn-load" onClick={fetchMoreFaces}>load more</button>}
                        {facesIsEmpty && <h4>no more faces</h4>}
                    </div>
            </div>
        </div>
        }
        
     </>       

        );
}

