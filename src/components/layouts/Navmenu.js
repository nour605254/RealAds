import React, { useState, useEffect } from 'react';
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useHistory } from 'react-router-dom';
import logo from '../../assets/images/icon/logo.png';

import app from '../../firebase'

export default function Navmenu() {

    const { currentUser } = useAuth()
    const [blocked, setBlocked] = useState(true)

    // fetch User Role Query
    useEffect(() => {
        const fetchCategory = async () => {
            const db = app.firestore()
            const dataUser = await db.collection("Users").where('Email', '==', currentUser.email).get()
            dataUser.docs.forEach(
                doc => {
                    if (doc.data().Role == 'CUSTOMER') {
                        setBlocked(false)
                    }
                    else if (doc.data().Role == 'ADMIN') {
                        setBlocked(true)
                    }
                }
            )
        }
        fetchCategory()
    }, [])

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
                        {blocked &&
                            <li>
                                <Link to="/users">
                                    <i className="fas fa-table"></i>Users</Link>
                            </li>
                        }
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