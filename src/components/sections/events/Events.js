import React, { useRef, useEffect, useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from "@fullcalendar/interaction"

import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js'
import $ from 'jquery';

import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

import app from '../../../firebase'

import { useAuth } from "../../../Contexts/AuthContext";

export default function Events() {
    const { currentUser } = useAuth()
    const [events, setEvents] = useState([])
    const categoryRef = useRef()

    useEffect(() => {
        const fetchEvent = async () => {
            const db = app.firestore()
            const data = await db.collection("Events").where('User', '==', currentUser.uid).get()

            let temp = []
            
            data.docs.forEach(
                doc => {
                    if (new Date(doc.data().End.toDate()).getTime() > new Date().getTime()) {
                        db.collection('Events').doc(doc.id).update({ Active: 1 })
                    }
                    else {
                        db.collection('Events').doc(doc.id).update({ Active: 0 })
                    }
                }
            )
            
            
            const doc = db.collection('Events').where('User', '==', currentUser.uid);
            
            doc.onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        //console.log('New Event: ', change.doc.data());

                        if (change.doc.data().Active == 1) {
                            if (change.doc.data().Start.toDate().getDay() == new Date().getDay() || change.doc.data().End.toDate().getDay() == new Date().getDay()) {
                                temp.push({ id: change.doc.id, title: change.doc.data().Name, start: change.doc.data().Start.toDate(), end: change.doc.data().End.toDate(), category: change.doc.data().Category, color: '#8F9A22' })
                            } else if (change.doc.data().Start.toDate().getDay() != new Date().getDay() || change.doc.data().End.toDate().getDay() != new Date().getDay()) {
                                temp.push({ id: change.doc.id, title: change.doc.data().Name, start: change.doc.data().Start.toDate(), end: change.doc.data().End.toDate(), category: change.doc.data().Category, color: '#5C88D7' })
                            }
                        }
                        else if (change.doc.data().Active == 0) {
                            temp.push({ id: change.doc.id, title: change.doc.data().Name, start: change.doc.data().Start.toDate(), end: change.doc.data().End.toDate(), category: change.doc.data().Category, color: '#AA5375' })
                        }
                        
                    }
                    if (change.type === 'modified') {
                       // console.log('Modified Event: ', change.doc.data())
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].title = change.doc.data().Name
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].start = change.doc.data().Start.toDate()
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].end = change.doc.data().End.toDate()
                        temp[temp.findIndex((obj => obj.id == change.doc.id))].category = change.doc.data().Category
                        if (change.doc.data().Active == 0) {
                            temp[temp.findIndex((obj => obj.id == change.doc.id))].color = '#AA5375'
                        } else if (change.doc.data().Active == 1) {
                            if (change.doc.data().Start.toDate().getDay() == new Date().getDay() || change.doc.data().End.toDate().getDay() == new Date().getDay()) {
                                temp[temp.findIndex((obj => obj.id == change.doc.id))].color = '#8F9A22'
                            }
                            else if (change.doc.data().Start.toDate().getDay() != new Date().getDay() || change.doc.data().End.toDate().getDay() != new Date().getDay()) {
                                temp[temp.findIndex((obj => obj.id == change.doc.id))].color = '#5C88D7'
                            }
                        }
                        
                        
                    }
                    if (change.type === 'removed') {
                        //console.log('Removed Event: ', change.doc.data());
                        temp.splice(temp.findIndex((obj => obj.id == change.doc.id)), 1);
                        
                    }
                    
                });
                // ...
                setEvents(temp)
                //console.log(temp)
                
            }, err => {
                console.log(`Encountered error: ${err}`);
            });          
            
            //setEvents(data.docs.map(doc => ({id: doc.id, title: doc.data().Name, start: doc.data().Start.toDate(), end: doc.data().End.toDate(), category: doc.data().Category })))
        }
        fetchEvent()
    }, [])

        return (
        <>
            <div className="row">
                <div className="col">
                    <div className="au-card">
                        <div id="calendar">
                                <FullCalendar
                                    plugins={[listPlugin, timeGridPlugin, interactionPlugin]}
                                    timeZone={ 'UTC' }
                                    customButtons= {{
                                        myCustomButton: {
                                            text: 'Add Event',
                                            click: function() {
                                                $("#add-events").modal("show");
                                                $(".modal-title").html("Add Events");
                                            }
                                        }
                                    }}
                                    headerToolbar={{
                                        left: "today prev,next",
                                        center: "",
                                        right: "listWeek,myCustomButton"
                                    }}
                                    footerToolbar={{
                                        left: "title",
                                        right: "timeGridWeek,timeGridDay"
                                    }}
                                    editable={true}
                                    eventResize={function (arg) {
                                        $("#update-events").modal("show");
                                        $(".modal-title").html("Update Events " + arg.event.id);
                                        document.getElementById("nameInput").value = arg.event.title;
                                        document.getElementById("catInput").value = arg.event.extendedProps.category;
                                        document.getElementById("idInput").value = arg.event.id;
                                        document.getElementById("startInput").value = arg.event.start.toISOString().substring(0, arg.event.start.toISOString().length - 1);
                                        document.getElementById("endInput").value = arg.event.end.toISOString().substring(0, arg.event.end.toISOString().length - 1);
                                    }}
                                    eventDrop={function (arg) {
                                        $("#update-events").modal("show");
                                        $(".modal-title").html("Update Events " + arg.event.id);
                                        document.getElementById("nameInput").value = arg.event.title;
                                        document.getElementById("catInput").value = arg.event.extendedProps.category;
                                        document.getElementById("idInput").value = arg.event.id;
                                        document.getElementById("startInput").value = arg.event.start.toISOString().substring(0, arg.event.start.toISOString().length - 1);
                                        document.getElementById("endInput").value = arg.event.end.toISOString().substring(0, arg.event.end.toISOString().length - 1);
                                    }}
                                    eventClick={function (arg) {
                                        $("#update-events").modal("show");
                                        $(".modal-title").html("Update Events " + arg.event.id);
                                        document.getElementById("nameInput").value = arg.event.title;
                                        document.getElementById("catInput").value = arg.event.extendedProps.category;
                                        document.getElementById("idInput").value = arg.event.id;
                                        document.getElementById("startInput").value = arg.event.start.toISOString().substring(0, arg.event.start.toISOString().length - 1);
                                        document.getElementById("endInput").value = arg.event.end.toISOString().substring(0, arg.event.end.toISOString().length - 1);
                                    }}
                                    events={events}
                                />
                        </div>
                    </div>
                </div>
            </div>
        </>
        );
}