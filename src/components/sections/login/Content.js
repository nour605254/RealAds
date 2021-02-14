import React, { Component, Fragment } from 'react';

import Login from './Login';
import { AuthProvider } from "../../../Contexts/AuthContext"

class Content extends Component {
    render() {
        return (
            <AuthProvider>
                <Fragment>

                    <Login />

                </Fragment>
            </AuthProvider>
        );
    }
}

export default Content;