import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import app from '../../../firebase'

export default function Event() {

    const [events, setEvents] = useState([])
    const [Ievents, setIEvents] = useState([])

    useEffect(() => {
        const fetchEvent = async () => {
            const db = app.firestore()
            const data = await db.collection("Events").where('Active', '==', 1).get()
            setEvents(data.docs.map(doc => ({ Name: doc.data().Name, Start: doc.data().Start, End: doc.data().End, id: doc.id })))
        }
        fetchEvent()
    }, [])

    useEffect(() => {
        const fetchIEvent = async () => {
            const db = app.firestore()
            const data = await db.collection("Events").where('Active', '==', 0).get()
            setIEvents(data.docs.map(doc => ({ Name: doc.data().Name, Start: doc.data().Start, End: doc.data().End, id: doc.id })))
        }
        fetchIEvent()
    }, [])

    useEffect(() => {
        const fetchEvents = async () => {
            const db = app.firestore()
            const data = await db.collection("Events").get()

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
        }
        fetchEvents()
    }, [])

    const brandProduct = 'rgba(0,181,233,0.8)'
    const brandService = 'rgba(0,173,95,0.8)'

    let dayEventRange = {
        Monday: {
            total: 0,
            events: []
        },
        Tuesday: {
            total: 0,
            events: []
        },
        Wednesday: {
            total: 0,
            events: []
        },
        Thursday: {
            total: 0,
            events: []
        },
        Friday: {
            total: 0,
            events: []
        },
        Saturday: {
            total: 0,
            events: []
        },
        Sunday: {
            total: 0,
            events: []
        },
    }
    events.forEach(doc => {
        if (doc.Start.toDate().getDay() == 0) {
            dayEventRange.Sunday.events.push(doc.Name)
            dayEventRange.Sunday.total += 1
        } else if (doc.Start.toDate().getDay() == 1) {
            dayEventRange.Monday.events.push(doc.Name)
            dayEventRange.Monday.total += 1
        } else if (doc.Start.toDate().getDay() == 2) {
            dayEventRange.Tuesday.events.push(doc.Name)
            dayEventRange.Tuesday.total += 1
        } else if (doc.Start.toDate().getDay() == 3) {
            dayEventRange.Wednesday.events.push(doc.Name)
            dayEventRange.Wednesday.total += 1
        } else if (doc.Start.toDate().getDay() == 4) {
            dayEventRange.Thursday.events.push(doc.Name)
            dayEventRange.Thursday.total += 1
        } else if (doc.Start.toDate().getDay() == 5) {
            dayEventRange.Friday.events.push(doc.Name)
            dayEventRange.Friday.total += 1
        } else if (doc.Start.toDate().getDay() == 6) {
            dayEventRange.Saturday.events.push(doc.Name)
            dayEventRange.Saturday.total += 1
        }
    });

    let dayIEventRange = {
        Monday: {
            total: 0,
            events: []
        },
        Tuesday: {
            total: 0,
            events: []
        },
        Wednesday: {
            total: 0,
            events: []
        },
        Thursday: {
            total: 0,
            events: []
        },
        Friday: {
            total: 0,
            events: []
        },
        Saturday: {
            total: 0,
            events: []
        },
        Sunday: {
            total: 0,
            events: []
        },
    }
    Ievents.forEach(doc => {
        if (doc.Start.toDate().getDay() == 0) {
            dayIEventRange.Sunday.events.push(doc.Name)
            dayIEventRange.Sunday.total += 1
        } else if (doc.Start.toDate().getDay() == 1) {
            dayIEventRange.Monday.events.push(doc.Name)
            dayIEventRange.Monday.total += 1
        } else if (doc.Start.toDate().getDay() == 2) {
            dayIEventRange.Tuesday.events.push(doc.Name)
            dayIEventRange.Tuesday.total += 1
        } else if (doc.Start.toDate().getDay() == 3) {
            dayIEventRange.Wednesday.events.push(doc.Name)
            dayIEventRange.Wednesday.total += 1
        } else if (doc.Start.toDate().getDay() == 4) {
            dayIEventRange.Thursday.events.push(doc.Name)
            dayIEventRange.Thursday.total += 1
        } else if (doc.Start.toDate().getDay() == 5) {
            dayIEventRange.Friday.events.push(doc.Name)
            dayIEventRange.Friday.total += 1
        } else if (doc.Start.toDate().getDay() == 6) {
            dayIEventRange.Saturday.events.push(doc.Name)
            dayIEventRange.Saturday.total += 1
        }
    });

    const event = {
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: brandService,
                    borderColor: 'transparent',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 0,
                    data: [dayEventRange.Monday.total, dayEventRange.Tuesday.total, dayEventRange.Wednesday.total, dayEventRange.Thursday.total, dayEventRange.Friday.total, dayEventRange.Saturday.total, dayEventRange.Sunday.total]

                },
                {
                    label: 'My Second dataset',
                    backgroundColor: brandProduct,
                    borderColor: 'transparent',
                    pointHoverBackgroundColor: '#fff',
                    borderWidth: 0,
                    data: [dayIEventRange.Monday.total, dayIEventRange.Tuesday.total, dayIEventRange.Wednesday.total, dayIEventRange.Thursday.total, dayIEventRange.Friday.total, dayIEventRange.Saturday.total, dayIEventRange.Sunday.total]

                }
            ]
        }
    }

    const totalEvents = events.length + Ievents.length
    const Iaverage = (Ievents.length/totalEvents)*100
    const average = (events.length/totalEvents)*100
        return (

            <div class="row">
                <div class="col-lg-6">
                    <div class="au-card recent-report">
                        <div class="au-card-inner">
                            <h3 class="title-2">Events Reports</h3>
                            <div class="chart-info">
                                <div class="chart-info__left">
                                    <div class="chart-note">
                                        <span class="dot dot--blue"></span>
                                        <span>inactives</span>
                                    </div>
                                    <div class="chart-note mr-0">
                                        <span class="dot dot--green"></span>
                                        <span>actives</span>
                                    </div>
                                </div>
                                <div class="chart-info__right">
                                    <div class="chart-statis">
                                        <span class="index incre">
                                            <i class="zmdi zmdi-long-arrow-up"></i>{average.toFixed(2)}%
                                                    </span>
                                        <span class="label">actives</span>
                                    </div>
                                    <div class="chart-statis mr-0">
                                        <span class="index decre">
                                            <i class="zmdi zmdi-long-arrow-down"></i>{Iaverage.toFixed(2) }%
                                                    </span>
                                        <span class="label">inactives</span>
                                    </div>
                                </div>
                            </div>
                            <div class="recent-report__chart">
                                <Line options={{
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false
                                    },
                                    responsive: true,
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                drawOnChartArea: true,
                                                color: '#f2f2f2'
                                            },
                                            ticks: {
                                                fontFamily: "Poppins",
                                                fontSize: 12
                                            }
                                        }],
                                        yAxes: [{
                                            ticks: {
                                                beginAtZero: true,
                                                fontFamily: "Poppins",
                                                fontSize: 12,
                                                maxTicksLimit: 5,
                                                stepSize: 50,
                                                max: 5,
                                            },
                                            gridLines: {
                                                display: true,
                                                color: '#f2f2f2'

                                            }
                                        }]
                                    },
                                    elements: {
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4,
                                            hoverBorderWidth: 3
                                        }
                                    }
                                }} data={event.data} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>


        );
}