import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';
import Header from '../layouts/Header';
import Content from '../sections/home/Content';
import Footer from '../layouts/Footer';
import Navmenu from '../layouts/Navmenu';
import HeaderMobile from '../layouts/HeaderMobile';
import { AuthProvider } from "../../Contexts/AuthContext"

class Home extends Component {
    render() {
        return (
        <AuthProvider>
            <Fragment>
                <MetaTags>
                    <title>Real Ads</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <div class="page-wrapper">
                    <HeaderMobile />
                    <Navmenu />
                    <div class="page-container">
                        <Header />
                        <Content />
                    </div>
                </div>
                
                
                </Fragment>
        </AuthProvider>
        );
    }
}

export default Home;