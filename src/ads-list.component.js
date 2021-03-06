import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AdDataService from "../ad.service";

import Ad from "./ad.component";

export default class AdsList extends Component {
    constructor(props) {
        super(props);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveAd = this.setActiveAd.bind(this);
        this.removeAllAds = this.removeAllAds.bind(this);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            ads: [],
            currentAd: null,
            currentIndex: -1,
        };
    }

    componentDidMount() {
        AdDataService.getAll().on("value", this.onDataChange);
    }

    componentWillUnmount() {
        AdDataService.getAll().off("value", this.onDataChange);
    }

    onDataChange(items) {
        let ads = [];

        items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            ads.push({
                key: key,
                reference: data.reference,
                categorie: data.categorie,
                proprietaire: data.proprietaire,
                url_fichier: data.url_fichier,
            });
        });

        this.setState({
            ads: ads,
        });
    }

    refreshList() {
        this.setState({
            currentAd: null,
            currentIndex: -1,
        });
    }

    setActiveAd(ad, index) {
        this.setState({
            currentAd: ad,
            currentIndex: index,
        });
    }

    removeAllAds() {
        AdDataService.deleteAll()
            .then(() => {
                this.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { ads, currentAd, currentIndex } = this.state;

        return (
            <div className="list row">
                <div className="col-md-6">
                    <h3>List of Ads</h3>
                    <ul className="list-group">
                        {ads &&
                            ads.map((ad, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveAd(ad, index)}
                                    key={index}
                                >
                                    {ad.reference}
                                </li>
                            ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllAds}
                    >
                        Remove All
          </button>
                </div>
                <div className="col-md-6">
                    {currentAd ? (
                        <Ad
                            ad={currentAd}
                            refreshList={this.refreshList}
                        />
                    ) : (
                            <div>
                                <br />
                                <p>Select an Ad...</p>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}
