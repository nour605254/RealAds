import React, { useRef, useState, Fragment, useEffect } from 'react'
import MetaTags from 'react-meta-tags'
import Header from '../layouts/Header'
import Content from '../sections/profile/Content'
import Navmenu from '../layouts/Navmenu'
import HeaderMobile from '../layouts/HeaderMobile'
import { AuthProvider } from "../../Contexts/AuthContext"

export default function Profile() {

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
                    <div className="page-wrapper">
                        <HeaderMobile />
                        <Navmenu />
                        <div className="page-container">
                            <Header />
                            <Content />
                        </div>
                    </div>            

                </Fragment>
            </AuthProvider>
        );
}