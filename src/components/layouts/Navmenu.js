import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

import logo from '../../assets/images/icon/logo.png';

const navigationmenu = [
    {
        id: 1,
        link: '/',
        linkText: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        child: false,
    },
    {
        id: 2,
        linkText: 'Ads',
        icon: 'fas fa-desktop',
        child: true,
        submenu: [
            {
                id: 21,
                link: '/ads/add',
                linkText: 'Add'
            },
            {
                id: 22,
                link: '/ads/show',
                linkText: 'Sow'
            },
        ]
    },
    {
        id: 3,
        linkText: 'Events',
        child: true,
        icon: 'fas fa-calendar-alt',
        submenu: [
            {
                id: 31,
                link: '/event/add',
                linkText: 'Add'
            },
            {
                id: 31,
                link: '/event/show',
                linkText: 'Sow'
            },

        ]
    },
    {
        id: 4,
        linkText: 'Users',
        icon: 'far fa-check-square',
        child: true,
        submenu: [
            {
                id: 41,
                link: '/user/add',
                linkText: 'Add'
            },
            {
                id: 42,
                link: '/user/show',
                linkText: 'Show'
            },
        ]
    },
];

class Navmenu extends Component {

    getNextSibling = function (elem, selector) {
        // Get the next sibling element
        var sibling = elem.nextElementSibling;
        // If there's no selector, return the first sibling
        if (!selector) return sibling;
        // If the sibling matches our selector, use it
        // If not, jump to the next sibling and continue the loop
        while (sibling) {
            if (sibling.matches(selector)) return sibling;
            sibling = sibling.nextElementSibling
        }
    }
    triggerChild = (e) => {
        let subMenu = '';
        subMenu = (this.getNextSibling(e.target, '.navbar__sub-list') !== undefined) ? this.getNextSibling(e.target, '.navbar__sub-list') : null;
        if (subMenu !== null && subMenu !== undefined && subMenu !== '') {
            subMenu.classList = subMenu.classList.contains('d-block') ? 'navbar__sub-list' : 'navbar__sub-list d-block';
        }
    }
    

    render() {
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
                            {navigationmenu.length > 0 ? navigationmenu.map((item, i) => (
                                <li key={i} className={`${item.child ? 'has-sub' : ''} `} onClick={this.triggerChild}>
                                    {item.child ? <Link onClick={e => e.preventDefault()} to="/"> <i class={item.icon}></i> {item.linkText} </Link> : <Link to={item.link}> <i class={item.icon}></i> {item.linkText} </Link>}
                                    {item.child ?
                                        <ul className="list-unstyled navbar__sub-list js-sub-list" role="menu">
                                            {item.submenu.map((sub_item, i) => (
                                                <li key={i} className={`${sub_item.child ? 'has-sub' : ''} `}>
                                                    {sub_item.child ? <Link onClick={e => e.preventDefault()} to="/"> {sub_item.linkText} </Link> : <Link to={sub_item.link}> {sub_item.linkText} </Link>}
                                                    {sub_item.submenu ?
                                                        <ul className="list-unstyled navbar__sub-list js-sub-list">
                                                            {sub_item.submenu.map((third_item, i) => (
                                                                <li key={i}><Link
                                                                    to={third_item.link}>{third_item.linkText}</Link>
                                                                </li>
                                                            ))}
                                                        </ul> : null}
                                                </li>
                                            ))}
                                        </ul>
                                        : null
                                    }
                                </li>
                            )) : null}
                        </ul>
                    </nav>
                </div>
            </aside>
        );
    }
}

export default Navmenu;