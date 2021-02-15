import React, { Component, Fragment } from 'react';
import { Line, Bar } from 'react-chartjs-2';

class Overview extends Component {
    constructor(props) {
        super(props);

        this.user = {
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

        this.ads = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                type: 'line',
                datasets: [{
                    data: [1, 18, 9, 17, 34, 22],
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                },]
            }
        }

        this.event = {
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June'],
                type: 'line',
                datasets: [{
                    data: [65, 59, 84, 84, 51, 55],
                    label: 'Dataset',
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,.55)',
                },]
            }
        }

        this.bilan = {
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
    }
    render() {
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
                                    <span>members online</span>
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
                                        }} data={this.user.data} />                                 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                    <div className="overview-item overview-item--c2">
                        <div className="overview__inner">
                            <div className="overview-box clearfix">
                                <div className="icon">
                                    <i className="zmdi zmdi-shopping-cart"></i>
                                </div>
                                <div className="text">
                                    <h2>388,688</h2>
                                    <span>items solid</span>
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
                                            tension: 0.00001,
                                            borderWidth: 1
                                        },
                                        point: {
                                            radius: 4,
                                            hitRadius: 10,
                                            hoverRadius: 4
                                        }
                                    }
                                }} data={this.ads.data} />
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
                                    <h2>1,086</h2>
                                    <span>this week</span>
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
                                }} data={this.event.data} />
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
                                }} data={this.bilan.data} />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </>
        );
    }
}

export default Overview;