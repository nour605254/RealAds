import React, { useState } from 'react';
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/icon/logo.png';

export default function Navmenu() {

    return (
        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="#">
                    <img src={logo} alt="Cool Admin" />
                </a>
            </div>
            <div className="menu-sidebar__content js-scrollbar1">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
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
                </nav>
            </div>
        </aside>
    );
}