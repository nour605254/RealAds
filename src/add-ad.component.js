import React, { Component } from "react";
import AdDataService from "..ad.service";

export default class AddAd extends Component {
    constructor(props) {
        super(props);
        this.onChangeReference = this.onChangeReference.bind(this);
        this.onChangeCategorie = this.onChangeCategorie.bind(this);
        this.onChangeProprietaire = this.onChangeProprietaire.bind(this);
        this.onChangeUrl_fichier = this.onChangeUrl_fichier.bind(this);
        this.saveAd = this.saveAd.bind(this);
        this.newAd= this.newAd.bind(this);

        this.state = {
            reference: "",
            categorie: "Gamer",
            proprietaire: "",
            url_fichier: "",
            published: false,

            submitted: false,
        };
    }

    onChangeReference(e) {
        this.setState({
            reference: e.target.value,
        });
    } 

    onChangeCategorie(e) {
        this.setState({
            categorie: e.target.value,
        });
    }
    onChangeProprietaire(e) {
        this.setState({
            proprietaire: e.target.value,
        });
    }

    onChangeUrl_fichier(e) {
        this.setState({
            url_fichier: e.target.value,
        });
    }

    saveAd() {
        let data = {
            reference: this.state.reference,
            categorie: this.state.categorie,
            proprietaire: this.state.proprietaire,
            url_fichier: this.state.url_fichier,
            published: false
        };

        AdDataService.create(data)
            .then(() => {
                console.log("Created new item successfully!");
                this.setState({
                    submitted: true,
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    newAd() {
        this.setState({
            reference: "",
            categorie: "",
            proprietaire: "",
            url_fichier: "",
           // published: false,

            submitted: false,
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newAd}>
                            Add
            </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="reference">Reference</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="reference"
                                    required
                                    value={this.state.reference}
                                    onChange={this.onChangeReference}
                                    name="reference"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="categorie">Categorie</label>
                                <form onSubmit={this.handleSubmit}>
                                    <label>
                                        <select value={this.state.value} onChange={this.handleChange}>
                                            <option value="Gamer">Gamer</option>
                                            <option value="Sport">Sport</option>
                                            <option value="Enseignement">Enseignement</option>

                                        </select>
                                    </label>
                                </form>

                            </div>
                            <div className="form-group">
                                <label htmlFor="proprietaire">Proprietaire</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="proprietaire"
                                    required
                                    value={this.state.proprietaire}
                                    onChange={this.onChangeProprietaire}
                                    name="proprietaire"
                                />
                            </div>

                             <div className="form-group">
                                <label htmlFor="url_fichier">Url_fichier</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="url_fichier"
                                    required
                                    value={this.state.url_fichier}
                                    onChange={this.onChangeUrl_fichier}
                                    name="url_fichier"
                                />
                            </div>

                            <button onClick={this.saveAd} className="btn btn-success">
                                Add
            </button>
                        </div>
                    )}
            </div>
        );
    }
}
