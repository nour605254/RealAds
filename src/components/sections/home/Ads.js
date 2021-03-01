import React, { useEffect, useState } from 'react';
import ReactApexChart from "react-apexcharts";

import app from '../../../firebase'

export default function Ads () {
    const [ads, setAds] = useState([])

    useEffect(() => {
        const fetchAdsAct = async () => {
            const db = app.firestore()
            const data = await db.collection("Ads").get()
            setAds(data.docs.map(doc => ({ Owner: doc.data().Proprietaire, View: doc.data().Vues, Touched: doc.data().Touche, Active: doc.data().Active, id: doc.id })))
        }
        fetchAdsAct()
    }, [])

    let ad = []

    ads.forEach(doc => {
        let dupData = 0
        let index = 0
        for (var i = 0; i < ad.length; i++) {
            
            if (ad[i].name == doc.Owner) {
                dupData = 1
                index = i
            }
        }

        if (dupData == 1) {
            ad[index].data.push([doc.View, doc.Touched, doc.Touched])
        }
        else {
            ad.push(
                {
                    name: doc.Owner,
                    data: [[doc.View, doc.Touched, doc.Touched]]
                }
            )
        }

    })
    console.log(ad)

    let state = {

            series: ad,
            options: {
                chart: {
                    height: 350,
                    type: 'bubble',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: 0.8
                },
                xaxis: {
                    tickAmount: 12,
                    type: 'category',
                },
                yaxis: {
                    
                }
            },


        };

        return (

            <div class="row" >
                <div  style={{ width: "100%" }}>
                    <div class="au-card recent-report">
                        <div class="au-card-inner" >
                            <h3 class="title-2">Ads Reports</h3>
                            <div class="chart-info">
                            </div>
                            <div class="recent-report__chart" >
                                <ReactApexChart options={state.options} series={state.series} type="bubble" height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
}