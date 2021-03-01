import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from "../../../Contexts/AuthContext";

import avatar from '../../../assets/images/icon/avatar-01.jpg'

export default function Profile() {
    const { currentUser } = useAuth()

    return (

    <>
            <div className="row">
                <div style={{ width: "100%" }}>
                    <div className="card">
                    <div className="card-header">
                        <i className="fa fa-user"></i>
                        <strong className="card-title pl-2">Profile Card</strong>
                        </div>
                    <div className="card-body">
                        <div className="mx-auto d-block">
                                <img className="rounded-circle mx-auto d-block" src={ avatar } alt="Card image cap" />
                                <h5 className="text-sm-center mt-2 mb-1">{currentUser.displayName }</h5>
                                <div className="location text-sm-center"> {currentUser.email}</div>
                            </div>
                            <hr/>
                        <div className="card-text text-sm-center">
                                <a href="#">
                                <i className="fa fa-facebook pr-1"></i>
                                </a>
                                <a href="#">
                                <i className="fa fa-twitter pr-1"></i>
                                </a>
                                <a href="#">
                                <i className="fa fa-linkedin pr-1"></i>
                                </a>
                                <a href="#">
                                <i className="fa fa-pinterest pr-1"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     </>       

        );
}

