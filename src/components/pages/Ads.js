import React, { useRef, useState, useEffect, Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Header from '../layouts/Header';
import Content from '../sections/ads/Content';
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

export default function Ads() {

    const [url, setUrl] = useState('')
    const [isPlaying, setPlaying] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [faces, setFaces] = useState([])
    const [selectedFaces, setSelectedFaces] = useState([])
    //const [ages, setAges] = useState([])
    const [selectedAges, setSelectedAges] = useState([])
    const [selectedGender, setSelectedGender] = useState([])
    const [isButtonAddAdDisabled, setIsButtonAddAdDisabled] = useState(false)
    const [isButtonAddAdUrlDisabled, setIsButtonAddAdUrlDisabled] = useState(false)
    const [isButtonAddCatDisabled, setIsButtonAddCatDisabled] = useState(false)
    const [isButtonAddFaceDisabled, setIsButtonAddFaceDisabled] = useState(false)

    const [isButtonUpdateAdDisabled, setIsButtonUpdateAdDisabled] = useState(false)
    const [isButtonUpdateCatDisabled, setIsButtonUpdateCatDisabled] = useState(false)
    const [isButtonUpdateFaceDisabled, setIsButtonUpdateFaceDisabled] = useState(false)

    const ownerAddAdRef = useRef()
    const idAddAdRef = useRef()
    const idAddAdUrlRef = useRef()
    const startAddAdRef = useRef()
    const urlAddAdRef = useRef()
    const endAddAdRef = useRef()
    const catAddAdRef = useRef()
    const categoryAddAdRef = useRef()
    const urlShowVideo = useRef()

    const ownerUpdateAdRef = useRef()
    const idUpdateAdRef = useRef()
    const startUpdateAdRef = useRef()
    const endUpdateAdRef = useRef()
    const catUpdateAdRef = useRef()
    const categoryUpdateAdRef = useRef()
    const [activeUpdateAdRef, setActiveUpdateAdRef] = useState(1)

    const nameAddCatRef = useRef()
    const idAddCatRef = useRef()
    const faAddCatRef = useRef()
    const facesAddCatRef = useRef()

    const nameUpdateCatRef = useRef()
    const idUpdateCatRef = useRef()
    const faUpdateCatRef = useRef()
    const facesUpdateCatRef = useRef()

    const nameAddFaceRef = useRef()
    const idAddFaceRef = useRef()
    const genderAddFaceRef = useRef()
    const agAddFaceRef = useRef()
    const agesAddFaceRef = useRef()

    const nameUpdateFaceRef = useRef()
    const idUpdateFaceRef = useRef()
    const genderUpdateFaceRef = useRef()
    const agUpdateFaceRef = useRef()
    const geUpdateFaceRef = useRef()
    const agesUpdateFaceRef = useRef()

    const [errorAddAd, setErrorAddAd] = useState('')
    const [infoAddAd, setInfoAddAd] = useState('')

    const [errorUpdateAd, setErrorUpdateAd] = useState('')
    const [infoUpdateAd, setInfoUpdateAd] = useState('')

    const [errorAddAdUrl, setErrorAddAdUrl] = useState('')
    const [infoAddAdUrl, setInfoAddAdUrl] = useState('')

    const [errorAddCat, setErrorAddCat] = useState('')
    const [infoAddCat, setInfoAddCat] = useState('')

    const [errorUpdateCat, setErrorUpdateCat] = useState('')
    const [infoUpdateCat, setInfoUpdateCat] = useState('')

    const [errorAddFace, setErrorAddFace] = useState('')
    const [infoAddFace, setInfoAddFace] = useState('')

    const [errorUpdateFace, setErrorUpdateFace] = useState('')
    const [infoUpdateFace, setInfoUpdateFace] = useState('')
    const [i, setI] = useState(0)
    



    useEffect(() => {
        const fetchCategory = async () => {
            const db = app.firestore()
            const data = await db.collection("Categorie").get()
            setCategories(data.docs.map(doc => ({ Category: doc.data().Nom, id: doc.id })))
        }
        fetchCategory()
    }, [])

    useEffect(() => {
        const fetchFaces = async () => {
            const db = app.firestore()
            const data = await db.collection("Visages").get()
            setFaces(data.docs.map(doc => ({ Face: doc.data().Nom, id: doc.id })))
        }
        fetchFaces()
    }, [])

    const ages = [
        { Age : 'Child', id: '1'},
        { Age : 'Teen', id: '2'},
        { Age : 'Adult', id: '3'},
        { Age : 'Elderly', id: '4'}
    ]

    const genders = [
        { value: 'Male', label: 'Male' },
        { value: 'Female', label: 'Female' },
        { value: 'Mixed', label: 'Mixed' }
    ]


    // Handle Ads
    async function handleAddAd(e) {
        e.preventDefault()
        let temp = []
        categoryAddAdRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Category)
        });

        try {

            setErrorAddAd('')
            setInfoAddAd('')
            const diff = new Date(startAddAdRef.current.value).getTime() - new Date().getTime()
            if (startAddAdRef.current.value < endAddAdRef.current.value) {
                if (diff >= 0) {
                    const db = app.firestore()
                    db.collection('Ads').add({
                        Proprietaire: ownerAddAdRef.current.value,
                        Categorie: temp,
                        Debut: new Date(startAddAdRef.current.value),
                        Fin: new Date(endAddAdRef.current.value),
                        Touche: 0,
                        Vues: 0,
                        Active: 1
                    });
                    setInfoAddAd('Advertising of ' + ownerAddAdRef.current.value + ' Added')
                    setIsButtonAddAdDisabled(true)
                    setTimeout(() => setIsButtonAddAdDisabled(false), 5000);
                    setTimeout(() => setInfoAddAd(''), 5000);
                    document.getElementById("add-ad-form").reset();
                    categoryAddAdRef.current.resetSelectedValues()
                }else {
                setErrorAddAd('the start date has already passed')
                }
            }else {
            setErrorAddAd('the end date must be greater than the start date')
            setTimeout(() => setErrorAddAd(''), 5000);
            }

        } catch (error) {

            console.log(error)

        }
    }

    async function handleAddAdUrl(e) {
        e.preventDefault()
        
        let id = ''
        try {

            setErrorAddAd('')
            setInfoAddAd('')

            const storageRef = app.storage().ref();
            const child = 'Ads/' + idAddAdUrlRef.current.value + '.' + document.getElementById('urlAddAdInput').files[0].type.split('/').pop()
            window.URL = window.URL || window.webkitURL;
            var video = document.createElement('video');
            video.preload = 'metadata';

            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src)
                var duration = video.duration
                document.getElementById('urlAddAdInput').files[0].duration = duration

                getDuration()
            }
            video.src = URL.createObjectURL(document.getElementById('urlAddAdInput').files[0]);;

            function getDuration() {
                return document.getElementById('urlAddAdInput').files[0].duration;

            }

            console.log(getDuration())

                if (document.getElementById('urlAddAdInput').files[0].type.split('/').pop() == "mp4") {
                    if (getDuration() <= 60) {
                        const urlAdsRef = storageRef.child(child);
                        let uploadTask = urlAdsRef.put(document.getElementById('urlAddAdInput').files[0])
                        //setInfoAddAdUrl('the video under 60 seconds')
                        uploadTask.on('state_changed',
                            (snapshot) => {
                                // Observe state change events such as progress, pause, and resume
                                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                                setIsButtonAddAdUrlDisabled(true)
                                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                setInfoAddAdUrl('Upload is ' + progress.toFixed(0) + '% done')
                                
                                //console.log('Upload is ' + progress + '% done');
                            },
                            (error) => {
                                // Handle unsuccessful uploads
                                setErrorAddAdUrl('The video was not sent, please try again')
                                setTimeout(() => setErrorAddAdUrl(''), 5000);
                            },
                            () => {
                                const db = app.firestore()
                                id = idAddAdUrlRef.current.value
                                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                                    db.collection('Ads').doc(id).update({ url_fichier: downloadURL })
                                });
                                
                                setInfoAddAdUrl('Advertising Url of Ad Id' + idAddAdUrlRef.current.value + ' Added')                       
                                setTimeout(() => setIsButtonAddAdUrlDisabled(false), 5000);
                                setTimeout(() => setInfoAddAdUrl(''), 5000);
                                document.getElementById("add-ad-url-form").reset();
                                document.querySelector('#button-url-ad').innerHTML = 'Set Advertising url';
                                document.getElementById("idAddAdUrlInput").value = id
                            }
                        );

                    }
                    else if (!getDuration()) {
                        setInfoAddAdUrl('Video saved click again to upload')
                        setTimeout(() => setInfoAddAdUrl(''), 5000);
                        document.querySelector('#button-url-ad').innerHTML = 'Upload Video';
                    } else {
                        setErrorAddAdUrl('the video must not exceed 60 seconds')
                        setTimeout(() => setErrorAddAdUrl(''), 5000);
                        document.querySelector('#button-url-ad').innerHTML = 'Set New Video';
                    }
                }
                else {
                    setErrorAddAdUrl('Video extention must be .mp4')
                    setTimeout(() => setErrorAddAdUrl(''), 5000);
                }
            
            

        } catch (error) {

            console.log(error)

        }
    }
    $('#view-ad-video').on('shown.bs.modal', function (e) {
        e.preventDefault()
        if (urlShowVideo.current.value != "") {
            setUrl(urlShowVideo.current.value)
            setPlaying(true)
        }
        else {
            $("#view-ad-video").modal("hide.bs.modal");
        }

    })

    $('#view-ad-video').on('hidden.bs.modal', function (e) {
        setPlaying(false)
    })

    async function handleUpdateAd(e) {
        e.preventDefault()
        let temp = []
        categoryUpdateAdRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Category)
        });
        try {
            setErrorUpdateAd('')
            setInfoUpdateAd('')
            if (startUpdateAdRef.current.value < endUpdateAdRef.current.value) {
                const db = app.firestore()
                if (new Date(endUpdateAdRef.current.value).getTime() < new Date().getTime()) {
                    setActiveUpdateAdRef(0)
                }
                db.collection('Ads').doc(idUpdateAdRef.current.value).update({ Proprietaire: ownerUpdateAdRef.current.value, Debut: new Date(startUpdateAdRef.current.value), Fin: new Date(endUpdateAdRef.current.value), Categorie: temp, Active: activeUpdateAdRef })
                setInfoUpdateAd(ownerUpdateAdRef.current.value + " Ad's Up To Date")
                setIsButtonUpdateAdDisabled(true)
                setTimeout(() => setIsButtonUpdateAdDisabled(false), 5000);
                setTimeout(() => setInfoUpdateAd(''), 5000);
            }
            else {
                setErrorUpdateAd('the end date must be greater than the start date')
                setTimeout(() => setErrorUpdateAd(''), 5000);
            }

        } catch (error) {

            console.log(error)

        }
    }

    $('#update-ad').unbind().on('shown.bs.modal', function (e) {
        e.preventDefault()
        const sc = catUpdateAdRef.current.value.split(",")
        let temp = []
        for (var i = 0; i < sc.length; i++) {
            temp.push({ Category: sc[i], id: i })

        }
        setSelectedCategory(temp)
    })

    async function handleCloseUpdateAd(e) {
        e.preventDefault()
        $("#update-ad").modal("hide");
    }

    // Handle Categories
    async function handleAddCat(e) {
        e.preventDefault()
        let temp = []
        facesAddCatRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Face)
        });

        try {

            setErrorAddCat('')
            setInfoAddCat('')

            const db = app.firestore()
            db.collection('Categorie').add({
                Visages: temp,
                Nom: nameAddCatRef.current.value
            });
            setInfoAddCat('Category named ' + nameAddCatRef.current.value + ' Added')
            setIsButtonAddCatDisabled(true)
            setTimeout(() => setIsButtonAddCatDisabled(false), 5000);
            setTimeout(() => setInfoAddCat(''), 5000);
            document.getElementById("add-cat-form").reset();
            facesAddCatRef.current.resetSelectedValues()


        } catch (error) {

            console.log(error)

        }
    }

    async function handleUpdateCat(e) {
        e.preventDefault()
        let temp = []
        facesUpdateCatRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Face)
        });
        try {
            setErrorUpdateCat('')
            setInfoUpdateCat('')
            const db = app.firestore()

            db.collection('Categorie').doc(idUpdateCatRef.current.value).update({ Nom: nameUpdateCatRef.current.value, Visages: temp })
            setInfoUpdateCat('Category named ' + nameUpdateCatRef.current.value + ' Up to date')
            setIsButtonUpdateCatDisabled(true)
            setTimeout(() => setIsButtonUpdateCatDisabled(false), 5000);
            setTimeout(() => setInfoUpdateCat(''), 5000);

        } catch (error) {

            console.log(error)

        }
    }

    $('#update-cat').unbind().on('shown.bs.modal', function (e) {
        e.preventDefault()
        const sc = faUpdateCatRef.current.value.split(",")
        let temp = []
        for (var i = 0; i < sc.length; i++) {
            temp.push({ Face: sc[i], id: i })

        }
        setSelectedFaces(temp)
    })

    async function handleCloseUpdateCat(e) {
        e.preventDefault()
        $("#update-cat").modal("hide");
    }

    // Handle Faces
    async function handleAddFace(e) {
        e.preventDefault()
        let temp = []
        agesAddFaceRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Age)
        });

        try {

            setErrorAddFace('')
            setInfoAddFace('')

            const db = app.firestore()
            db.collection('Visages').add({
                Age: temp,
                Sexe: genderAddFaceRef.current.state.value.value,
                Nom: nameAddFaceRef.current.value
            });
            setInfoAddFace('Face named ' + nameAddFaceRef.current.value + ' Added')
            setIsButtonAddFaceDisabled(true)
            setTimeout(() => setIsButtonAddFaceDisabled(false), 5000);
            setTimeout(() => setInfoAddFace(''), 5000);
            document.getElementById("add-face-form").reset();
            agesAddFaceRef.current.resetSelectedValues()


        } catch (error) {

            console.log(error)

        }
    }

    async function handleUpdateFace(e) {
        e.preventDefault()
        let temp = []
        agesUpdateFaceRef.current.state.selectedValues.forEach(doc => {
            temp.push(doc.Age)
        });
        console.log(temp)
        try {
            setErrorUpdateFace('')
            setInfoUpdateFace('')
            const db = app.firestore()
            if (genderUpdateFaceRef.current.state.value === null || genderUpdateFaceRef.current.state.value.length == 0) {
                db.collection('Visages').doc(idUpdateFaceRef.current.value).update({ Nom: nameUpdateFaceRef.current.value, Age: temp })
            } else {
                db.collection('Visages').doc(idUpdateFaceRef.current.value).update({ Nom: nameUpdateFaceRef.current.value, Age: temp, Sexe: genderUpdateFaceRef.current.state.value.value })
            }
            setInfoUpdateFace('Face named ' + nameUpdateFaceRef.current.value + ' Up to date')
            setIsButtonUpdateFaceDisabled(true)
            setTimeout(() => setIsButtonUpdateFaceDisabled(false), 5000);
            setTimeout(() => setInfoUpdateFace(''), 5000);
            

        } catch (error) {

            console.log(error)

        }
    }

    $('#update-face').unbind().on('shown.bs.modal', function (e) {
        e.preventDefault();
        const sc = agUpdateFaceRef.current.value.split(",")
        let temp = []
        for (var i = 0; i < sc.length; i++) {
            temp.push({ Age: sc[i], id: i })

        }
        setSelectedAges(temp)

        setSelectedGender({ value: geUpdateFaceRef.current.value, label: geUpdateFaceRef.current.value })
       
    })

    async function genderOptionChanged(value) {
        setSelectedGender(value)
    };

    async function handleCloseUpdateFace(e) {
        e.preventDefault()
        $("#update-face").modal("hide");
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

                    <div className="modal fade bd-example-modal-lg" id="view-ad-video" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" >
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <ReactPlayer
                                    playing={isPlaying}
                                    url={url}
                                    controls
                                    width="100%"
                                    height="100%"
                                />
                                <input type="text" id="urlShowVideo" ref={urlShowVideo} hidden />
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="add-ad" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> Add Advertising </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorAddAd && <Alert variant="danger">{errorAddAd }</Alert>}
                                    {infoAddAd  && <Alert variant="info">{infoAddAd }</Alert>}
                                    <Form id="add-ad-form" onSubmit={handleAddAd}>
                                        <Form.Group id="owner">
                                            <Form.Label>Owner</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="ownerAddAdInput" type="text" ref={ownerAddAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idAddAdInput" type="text" ref={idAddAdRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="start">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="startAddAdInput" type="datetime-local" ref={startAddAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="end">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="endAddAdInput" type="datetime-local" ref={endAddAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="category">
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="catAddAdInput" type="text" ref={catAddAdRef} hidden />
                                            <Multiselect id="catAddAdInput" options={categories} displayValue={"Category"} ref={categoryAddAdRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddAdDisabled}>Add Advertising</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="update-ad" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="update-ad-modal-label" > </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorUpdateAd && <Alert variant="danger">{errorUpdateAd}</Alert>}
                                    {infoUpdateAd && <Alert variant="info">{infoUpdateAd}</Alert>}
                                    <Form id="update-ad-form" onSubmit={handleUpdateAd}>
                                        <Form.Group id="owner">
                                            <Form.Label>Owner</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="ownerUpdateAdInput" type="text" ref={ownerUpdateAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idUpdateAdInput" type="text" ref={idUpdateAdRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="start">
                                            <Form.Label>Start Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="startUpdateAdInput" type="datetime-local" ref={startUpdateAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="end">
                                            <Form.Label>End Date</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="endUpdateAdInput" type="datetime-local" ref={endUpdateAdRef} required />
                                        </Form.Group>
                                        <Form.Group id="category">
                                            <Form.Label>Categories</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="catUpdateAdInput" type="text" ref={catUpdateAdRef} hidden />
                                            <Multiselect id="catUpdateAdInput" options={categories} displayValue={"Category"} selectedValues={selectedCategory} ref={categoryUpdateAdRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonUpdateAdDisabled}>Update Advertising</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateAd} data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="add-ad-url" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> Set New Advertising url </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorAddAdUrl && <Alert variant="danger">{errorAddAdUrl}</Alert>}
                                    {infoAddAdUrl && <Alert variant="info">{infoAddAdUrl}</Alert>}
                                    <Form id="add-ad-url-form" onSubmit={handleAddAdUrl}>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idAddAdUrlInput" type="text" ref={idAddAdUrlRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="url">
                                            <Form.Label>Url</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="urlAddAdInput" type="file" accept="video/*" ref={urlAddAdRef} required />
                                        </Form.Group>
                                        <Button id="button-url-ad" className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddAdUrlDisabled}>Set Advertising url</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="modal fade" id="add-cat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> Add Category </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorAddCat && <Alert variant="danger">{errorAddCat}</Alert>}
                                    {infoAddCat && <Alert variant="info">{infoAddCat}</Alert>}
                                    <Form id="add-cat-form" onSubmit={handleAddCat}>
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="nameAddCatInput" type="text" ref={nameAddCatRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idAddCatInput" type="text" ref={idAddCatRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="category">
                                            <Form.Label>Faces</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="catAddCatInput" type="text" ref={faAddCatRef} hidden />
                                            <Multiselect id="facesAddCatInput" options={faces} displayValue={"Face"} ref={facesAddCatRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddCatDisabled}>Add Category</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="update-cat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="update-cat-modal-label" > </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorUpdateCat && <Alert variant="danger">{errorUpdateCat}</Alert>}
                                    {infoUpdateCat && <Alert variant="info">{infoUpdateCat}</Alert>}
                                    <Form id="update-cat-form" onSubmit={handleUpdateCat}>
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="nameUpdateCatInput" type="text" ref={nameUpdateCatRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idUpdateCatInput" type="text" ref={idUpdateCatRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="category">
                                            <Form.Label>Faces</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="faUpdateCatInput" type="text" ref={faUpdateCatRef} hidden />
                                            <Multiselect id="facesUpdateCatInput" options={faces} displayValue={"Face"} selectedValues={selectedFaces} ref={facesUpdateCatRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonUpdateCatDisabled}>Update Category</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseUpdateCat} data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    <div className="modal fade" id="add-face" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title"> Add Face </h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorAddFace && <Alert variant="danger">{errorAddFace}</Alert>}
                                    {infoAddFace && <Alert variant="info">{infoAddFace}</Alert>}
                                    <Form id="add-face-form" onSubmit={handleAddFace}>
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="nameAddFaceInput" type="text" ref={nameAddFaceRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idAddFaceInput" type="text" ref={idAddFaceRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="gender">
                                            <Form.Label>Gender</Form.Label>
                                            <Select options={genders} id="genderAddFaceInput" ref={genderAddFaceRef} />
                                        </Form.Group>
                                        <Form.Group id="age">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="agAddFaceInput" type="text" ref={agAddFaceRef} hidden />
                                            <Multiselect id="agesAddFaceInput" options={ages} displayValue={"Age"} ref={agesAddFaceRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonAddFaceDisabled}>Add Face</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modal fade" id="update-face" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="update-face-modal-label"></h5>
                                    <button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {errorUpdateFace && <Alert variant="danger">{errorUpdateFace}</Alert>}
                                    {infoUpdateFace && <Alert variant="info">{infoUpdateFace}</Alert>}
                                    <Form id="update-face-form" onSubmit={handleUpdateFace}>
                                        <Form.Group id="name">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="nameUpdateFaceInput" type="text" ref={nameUpdateFaceRef} required />
                                        </Form.Group>
                                        <Form.Group id="id">
                                            <Form.Control className="au-input au-input--full" id="idUpdateFaceInput" type="text" ref={idUpdateFaceRef} hidden />
                                        </Form.Group>
                                        <Form.Group id="gender">
                                            <Form.Label>Gender</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="geUpdateFaceInput" type="text" ref={geUpdateFaceRef} hidden />
                                            <Select options={genders} id="genderUpdateFaceInput" onChange={genderOptionChanged} value={selectedGender} ref={genderUpdateFaceRef} />
                                        </Form.Group>
                                        <Form.Group id="age">
                                            <Form.Label>Age</Form.Label>
                                            <Form.Control className="au-input au-input--full" id="agUpdateFaceInput" type="text" ref={agUpdateFaceRef} hidden />
                                            <Multiselect id="agesUpdateFaceInput" options={ages} displayValue={"Age"} selectedValues={selectedAges} ref={agesUpdateFaceRef} />
                                        </Form.Group>
                                        <Button className="au-btn au-btn--block au-btn--blue m-b-20" type="submit" disabled={isButtonUpdateFaceDisabled}>Update Face</Button>
                                    </Form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={ handleCloseUpdateFace } data-dismiss="modal">X</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Fragment>
            </AuthProvider>
        );
}