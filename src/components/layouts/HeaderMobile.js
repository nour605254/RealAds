import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'react-dropdown/style.css';
import logo from '../../assets/images/icon/logo.png';


export default function HeaderMobile() {

    return (

        <header class="header-mobile d-block d-lg-none">
            <div class="header-mobile__bar">
                <div class="container-fluid">
                    <div class="header-mobile-inner">
                        <a class="logo" href="index.html">
                            <img src={ logo } alt="CoolAdmin" />
                        </a>
                        <button class="hamburger hamburger--slider" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <nav class="navbar-mobile">
                <div class="container-fluid">
                    <ul class="navbar-mobile__list list-unstyled">
                        <li>
                            <Link to="/">
                                <i className="fas fa-tachometer-alt"></i>Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/events">
                                <i className="fas fa-calendar-alt"></i>Events</Link>
                        </li>
                        <li>
                            <Link to="/ads">
                                <i className="fas fa-chart-bar"></i>Ads</Link>
                        </li>
                        <li>
                            <Link to="/users">
                                <i className="fas fa-table"></i>Users</Link>
                        </li>
                        <li>
                            <Link to="/devices">
                                <i className="far fa-check-square"></i>Devices</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        );
}