import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import app from '../../../firebase'

export default function Overview() {

    const [events, setEvents] = useState([])
    const [ads, setAds] = useState([])

    useEffect(() => {
        const fetchEventsAct = async () => {
            const db = app.firestore()
            const data = await db.collection("Events").where('Active','==', 1).get()
            setEvents(data.docs.map(doc => ({ Name: doc.data().Name, Start: doc.data().Start, End: doc.data().End, id: doc.id })))
        }
        fetchEventsAct()
    }, [])

    useEffect(() => {
        const fetchAdsAct = async () => {
            const db = app.firestore()
            const data = await db.collection("Ads").where('Active', '==', 1).get()
            setAds(data.docs.map(doc => ({ Owner: doc.data().Proprietaire, Start: doc.data().Debut, End: doc.data().Fin, id: doc.id })))
        }
        fetchAdsAct()
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

    useEffect(() => {
        const fetchAds = async () => {
            const db = app.firestore()
            const data = await db.collection("Ads").get()

            let temp = []

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
        }
        fetchAds()
    }, [])

    let dayEventRange = {
        Monday: {
            total: 0,
            events : []
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

    //console.log(dayEventRange)

    let monthAdRange = {
        January: {
            total: 0,
            ads: []
        },
        Febuary: {
            total: 0,
            ads: []
        },
        March: {
            total: 0,
            ads: []
        },
        April: {
            total: 0,
            ads: []
        },
        May: {
            total: 0,
            ads: []
        },
        June: {
            total: 0,
            ads: []
        },
        July: {
            total: 0,
            ads: []
        },
        August: {
            total: 0,
            ads: []
        },
        September: {
            total: 0,
            ads: []
        },
        October: {
            total: 0,
            ads: []
        },
        November: {
            total: 0,
            ads: []
        },
        December: {
            total: 0,
            ads: []
        },
    }
    ads.forEach(doc => {
        if (doc.Start.toDate().getMonth() == 11) {
            monthAdRange.December.ads.push(doc.Owner)
            monthAdRange.December.total += 1
        } else if (doc.Start.toDate().getMonth() == 0) {
            monthAdRange.January.ads.push(doc.Owner)
            monthAdRange.January.total += 1
        } else if (doc.Start.toDate().getMonth() == 1) {
            monthAdRange.Febuary.ads.push(doc.Owner)
            monthAdRange.Febuary.total += 1
        } else if (doc.Start.toDate().getMonth() == 2) {
            monthAdRange.March.ads.push(doc.Owner)
            monthAdRange.March.total += 1
        } else if (doc.Start.toDate().getMonth() == 3) {
            monthAdRange.April.ads.push(doc.Owner)
            monthAdRange.April.total += 1
        } else if (doc.Start.toDate().getMonth() == 4) {
            monthAdRange.May.ads.push(doc.Owner)
            monthAdRange.May.total += 1
        } else if (doc.Start.toDate().getMonth() == 5) {
            monthAdRange.June.ads.push(doc.Owner)
            monthAdRange.June.total += 1
        } else if (doc.Start.toDate().getMonth() == 6) {
            monthAdRange.July.ads.push(doc.Owner)
            monthAdRange.July.total += 1
        } else if (doc.Start.toDate().getMonth() == 7) {
            monthAdRange.August.ads.push(doc.Owner)
            monthAdRange.August.total += 1
        } else if (doc.Start.toDate().getMonth() == 8) {
            monthAdRange.September.ads.push(doc.Owner)
            monthAdRange.September.total += 1
        } else if (doc.Start.toDate().getMonth() == 9) {
            monthAdRange.October.ads.push(doc.Owner)
            monthAdRange.October.total += 1
        } else if (doc.Start.toDate().getMonth() == 10) {
            monthAdRange.November.ads.push(doc.Owner)
            monthAdRange.November.total += 1
        }
    });

    console.log(ads)
    console.log(monthAdRange)

    const user = {
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            type: 'line',
            datasets: [{
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'Dataset',
                backgroundColor: 'rgba(255,255,255,.1)',
                borderColor: 'rgba(255,255,255,.55)',
            },]
        }
    }

    const ad = {
        data: {
            labels: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                data: [monthAdRange.January.total, monthAdRange.Febuary.total, monthAdRange.March.total, monthAdRange.April.total, monthAdRange.May.total, monthAdRange.June.total, monthAdRange.July.total, monthAdRange.August.total, monthAdRange.September.total, monthAdRange.October.total, monthAdRange.November.total, monthAdRange.December.total],
                label: 'Ads',
                backgroundColor: 'rgba(255,255,255,.55)',
                borderWidth: "0",
                borderColor: 'transparent',
            },]
        }
    }

    const event = {
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            type: 'line',
            datasets: [{
                data: [dayEventRange.Monday.total, dayEventRange.Tuesday.total, dayEventRange.Wednesday.total, dayEventRange.Thursday.total, dayEventRange.Friday.total, dayEventRange.Saturday.total, dayEventRange.Sunday.total],
                label: 'Events',
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
            },]
        }
    }

    const bilan = {
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: "My First dataset",
                    data: [78, 81, 80, 65, 58, 75, 60, 75, 65, 60, 60, 75],
                    borderColor: "transparent",
                    borderWidth: "0",
                    backgroundColor: "rgba(255,255,255,.3)"
                }
            ]
        }
    }

    return (
        <>
            <div className="row m-t-25">
                <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c1">
                        <div className="overview__inner">
                            <div className="overview-box clearfix">
                                <div className="icon">
                                    <i className="zmdi zmdi-account-o"></i>
                                </div>
                                <div className="text">
                                    <h2>10368</h2>
                                    <span>Users</span>
                                </div>
                            </div>
                            <div className="overview-chart">
                                <Line options={{
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false
                                    },
                                    layout: {
                                        padding: {
                                            left: 0,
                                            right: 0,
                                            top: 0,
                                            bottom: 0
                                        }
                                    },
                                    responsive: true,
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                color: 'transparent',
                                                zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                fontSize: 2,
                                                fontColor: 'transparent'
                                            }
                                        }],
                                        yAxes: [{
                                            display: false,
                                            ticks: {
                                                display: false,
                                            }
                                        }]
                                    },
                                    title: {
                                        display: false,
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 0
                                        },
                                        point: {
                                            radius: 0,
                                            hitRadius: 10,
                                            hoverRadius: 4
                                        }
                                    }
                                }} data={user.data} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c2">
                        <div className="overview__inner">
                            <div className="overview-box clearfix">
                                <div className="icon">
                                    <i className="zmdi zmdi-aspect-ratio"></i>
                                </div>
                                <div className="text">
                                    <h2>{ads.length}</h2>
                                    <span>Active Ads</span>
                                </div>
                            </div>
                            <div className="overview-chart">
                                <Bar options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false
                                    },
                                    responsive: true,
                                    tooltips: {
                                        mode: 'index',
                                        titleFontSize: 12,
                                        titleFontColor: '#000',
                                        bodyFontColor: '#000',
                                        backgroundColor: '#fff',
                                        titleFontFamily: 'Montserrat',
                                        bodyFontFamily: 'Montserrat',
                                        cornerRadius: 3,
                                        intersect: false,
                                    },
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                color: 'transparent',
                                                zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                fontSize: 2,
                                                fontColor: 'transparent'
                                            }
                                        }],
                                        yAxes: [{
                                            display: false,
                                            ticks: {
                                                display: false,
                                            }
                                        }]
                                    },
                                    title: {
                                        display: false,
                                    },
                                    elements: {
                                        line: {
                                            tension: 0.00001,
                                            borderWidth: 1
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4
                                        }
                                    }
                                }} data={ad.data} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c3">
                        <div className="overview__inner">
                            <div className="overview-box clearfix">
                                <div className="icon">
                                    <i className="zmdi zmdi-calendar-note"></i>
                                </div>
                                <div className="text">
                                    <h2>{ events.length }</h2>
                                    <span>Events to come</span>
                                </div>
                            </div>
                            <div className="overview-chart">
                                <Line options={{
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false
                                    },
                                    responsive: true,
                                    tooltips: {
                                        mode: 'index',
                                        titleFontSize: 12,
                                        titleFontColor: '#000',
                                        bodyFontColor: '#000',
                                        backgroundColor: '#fff',
                                        titleFontFamily: 'Montserrat',
                                        bodyFontFamily: 'Montserrat',
                                        cornerRadius: 3,
                                        intersect: false,
                                    },
                                    scales: {
                                        xAxes: [{
                                            gridLines: {
                                                color: 'transparent',
                                                zeroLineColor: 'transparent'
                                            },
                                            ticks: {
                                                fontSize: 2,
                                                fontColor: 'transparent'
                                            }
                                        }],
                                        yAxes: [{
                                            display: false,
                                            ticks: {
                                                display: false,
                                            }
                                        }]
                                    },
                                    title: {
                                        display: false,
                                    },
                                    elements: {
                                        line: {
                                            borderWidth: 1
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4
                                        }
                                    }
                                }} data={event.data} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c4">
                        <div className="overview__inner">
                            <div className="overview-box clearfix">
                                <div className="icon">
                                    <i className="zmdi zmdi-money"></i>
                                </div>
                                <div className="text">
                                    <h2>$1,060,386</h2>
                                    <span>total earnings</span>
                                </div>
                            </div>
                            <div className="overview-chart">
                                <Bar options={{
                                    maintainAspectRatio: true,
                                    legend: {
                                        display: false
                                    },
                                    scales: {
                                        xAxes: [{
                                            display: false,
                                            categoryPercentage: 1,
                                            barPercentage: 0.65
                                        }],
                                        yAxes: [{
                                            display: false
                                        }]
                                    }
                                }} data={bilan.data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}