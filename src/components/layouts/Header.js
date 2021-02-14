import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { useAuth } from "../../Contexts/AuthContext";

import profile from '../../assets/images/icon/avatar-06.jpg';

import 'react-dropdown/style.css';


export default function Header() {
    const { currentUser } = useAuth()
        return (
                
                <div className="page-container">
                    <header className="header-desktop">
                        <div className="section__content section__content--p30">
                            <div className="container-fluid">
                                <div className="header-wrap">
                                    <form className="form-header" action="" method="POST">
                                        <input className="au-input au-input--xl" type="text" name="search" placeholder="Search for datas &amp; reports..." />
                                        <button className="au-btn--submit" type="submit">
                                            <i className="zmdi zmdi-search"></i>
                                        </button>
                                    </form>
                                    <HeaderButton>
                                        <NotiWrap quantity="3" icon="zmdi zmdi-notifications" >
                                            <NotifiDropdown >3</NotifiDropdown>
                                        </NotiWrap>
                                        <AccountWrap image={profile} nom="johny doe" >
                                            <AccountDropdown />
                                        </AccountWrap>
                                    </HeaderButton>
                                    
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

        );
}

function HeaderButton(props) {
            
    return (

        <div className="header-button">
            { props.children }
        </div>

        );
}

function NotiWrap(props) {
    const [open, setOpen] = useState(false);

    return (

        <div className="noti-wrap">
            <div className="noti__item js-item-menu" onClick={ () => setOpen(!open) }>
                <i className={props.icon}></i>
                <span className="quantity">{props.quantity}</span>

                {open && props.children}
            </div>
        </div>

        );
}

function NotifiDropdown(props) {

    function NotifiDropdownItem(props) {
        return (
            <div class="notifi__item">
                <div class={ props.color }>
                    <i class={ props.icon }></i>
                </div>
                <div class="content">
                    <p> { props.children } </p>
                    <span class="date">{ props.date }</span>
                </div>
            </div>
        );
    }

    return (

        <div class="notifi-dropdown js-dropdown">
            <div class="notifi__title">
                <p>You have { props.children } Notifications</p>
            </div>

            <NotifiDropdownItem color="bg-c1 img-cir img-40" icon="zmdi zmdi-email-open" date="April 12, 2018 06:50" > You got a email notification </NotifiDropdownItem>
            <NotifiDropdownItem color="bg-c2 img-cir img-40" icon="zmdi zmdi-account-box" date="April 12, 2018 06:50" > Your account has been blocked </NotifiDropdownItem>
            <NotifiDropdownItem color="bg-c3 img-cir img-40" icon="zmdi zmdi-file-text" date="April 12, 2018 06:50" > You got a new file </NotifiDropdownItem>

            <div class="notifi__footer">
                <a href="#">All notifications</a>
            </div>
        </div>

    );
}

function AccountWrap(props) {
    const [open, setOpen] = useState(false);

    return (

        <div className="account-wrap">
            <div className="account-item clearfix js-item-menu" onClick={() => setOpen(!open)}>
                <div className="image">
                    <img src={props.image} alt={props.nom} />
                </div>
                <div className="content">
                    <a className="js-acc-btn" href="#">{props.nom}</a>
                </div>

                {open && props.children}
            </div>
        </div>

    );
}

function AccountDropdown(props) {

    const [error, setError] = useState("")
    const { currentUser } = useAuth()
    const { logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        try {
            setError('')

            await logout()
            history.push("/login")
        } catch {
            setError('Failed to log out')
        }

    }

    function AccountDropdownBody(props) {
        return (
            <div className="account-dropdown__body">
                <div className="account-dropdown__item">
                    <a href="#">
                        <i className={props.icon}></i>{ props.children }</a>
                </div>
            </div>
            );
    }

    return (

        <div className="account-dropdown js-dropdown">

            <div className="info clearfix">
                <div className="image">
                    <a href="#">
                        <img src={ profile } alt="John Doe" />
                    </a>
                </div>
                <div className="content">
                    <h5 className="name">
                        <a href="#">{currentUser.displayName}</a>
                    </h5>
                    <span className="email">{currentUser.email}</span>
                </div>
            </div>

            <AccountDropdownBody icon="zmdi zmdi-account" >Account</AccountDropdownBody>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="account-dropdown__footer">
                <a onClick={handleLogout}>
                    <i className="zmdi zmdi-power"></i>Logout
                </a>
            </div>
        </div>

    );
}