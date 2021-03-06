import React, { Component } from "react";
import ReactDOM from 'react-dom';
import AdDataService from "../services/ad.service";
import "firebase/auth"

export default class Ad extends Component {
    constructor(props) {
        super(props);
        this.onChangeReference = this.onChangeReference.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onChangeProprietaire = this.onChangeProprietaire.bind(this);
        this.onChangeUrl_fichier = this.onChangeUrl_fichier.bind(this);
        //this.updatePublished = this.updatePublished.bind(this);
        this.updateAd = this.updateAd.bind(this);
        this.deleteAd = this.deleteAd.bind(this);

        this.state = {
            currentAd: {
                key: null,
                reference: "",
                categorie: "Gamer",
                proprietaire: "",
                url_fichier: "", 
                //published: false,
            },
            message: "",
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { ad } = nextProps;
        if (prevState.currentAd.key !== ad.key) {
            return {
                currentAd: ad,
                message: ""
            };
        }

        return prevState.currentAd;
    }

    componentDidMount() {
        this.setState({
            currentAd: this.props.ad,
        });
    }

    onChangeReference(e) {
        const reference = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAd: {
                    ...prevState.currentAd,
                    reference: reference,
                },
            };
        });
    }

    onChangeCategorie(e) {
        const categorie = e.target.value;

        this.setState(function (prevState) {
            return {
                currentAd: {
                    ...prevState.currentAd,
                    categorie: categorie,
                },
            };
        });
    }
    onChangeProprietaire(e) {
        const proprietaire = e.target.value;

        this.setState((prevState) => ({
            currentAd: {
                ...prevState.currentAd,
                proprietaire: proprietaire,
            },
        }));
    }

    onChangeUrl_fichier(e) {
        const url_fichier = e.target.value;

        this.setState((prevState) => ({
            currentAd: {
                ...prevState.currentAd,
                url_fichier: url_fichier,
            },
        }));
    }
    /*
    updatePublished(status) {
    AdDataService.update(this.state.currentAd.key, {
            published: status,
        })
            .then(() => {
                this.setState((prevState) => ({
                    currentAd: {
                        ...prevState.currentAd,
                        published: status,
                    },
                    message: "The status was updated successfully!",
                }));
            })
            .catch((e) => {
                console.log(e);
            });
    }
    */

    updateAd() {
        const data = {
            reference: this.state.currentAd.reference,
            categorie: this.state.currentAd.categorie,
            proprietaire: this.state.currentAd.proprietaire,
            url_fichier: this.state.currentAd.url_fichier,
        };

        AdDataService.update(this.state.currentAd.key, data)
            .then(() => {
                this.setState({
                    message: "The ad was updated successfully!",
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    deleteAd() {
        AdDataService.delete(this.state.currentAd.key)
            .then(() => {
                this.props.refreshList();
            })
            .catch((e) => {
                console.log(e);
            });
    }

    render() {
        const { currentAd } = this.state;

        return (
            <div>
                <h4>Ad</h4>
                {currentAd ? (
                    <div className="edit-form">
                        <form>
                           
                            <div className="form-group">
                                <label htmlFor="reference">Reference</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reference"
                                    value={currentAd.reference}
                                    onChange={this.onChangeReference}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categorie">Categorie</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="categorie"
                                    required
                                    value={this.state.categorie}
                                    onChange={this.onChangeCategorie}
                                    name="categorie"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="proprietaire">Proprietaire</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="proprietaire"
                                    value={currentAd.proprietaire}
                                    onChange={this.onChangeProprietaire}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="url_fichier">Url_fichier</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="url_fichier"
                                    value={currentAd.url_fichier}
                                    onChange={this.onChangeUrl_fichier}
                                />
                            </div>
                            {/*
                             
                            <div className="form-group">
                                <label>
                                    <strong>Status:</strong>
                                </label>
                                {currentAd.published ? "Published" : "Pending"}
                            </div>
                            */}
                            
                        </form>
                        {/*
                        {currentAd.published ? (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => this.updatePublished(false)}
                            >
                                UnPublish
                            </button>
                        ) : (
                                <button
                                    className="badge badge-primary mr-2"
                                    onClick={() => this.updatePublished(true)}
                                >
                                    Publish
                                </button>
                            )}
                        */}

                        <button
                            className="badge badge-danger mr-2"
                            onClick={this.deleteAd}
                        >
                            Delete
            </button>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateAd}
                        >
                            Update
            </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                        <div>
                            <br />
                            <p>Please click on an Ad...</p>
                        </div>
                    )}
            </div>
        );
    }
}
