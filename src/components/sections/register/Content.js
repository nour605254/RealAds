import React, { Component, Fragment } from 'react';

import Register from './Register';
import { AuthProvider } from "../../../Contexts/AuthContext"

class Content extends Component {
    render() {
        return (
            <AuthProvider>
                <Fragment>

                <Register />

                </Fragment>
            </AuthProvider>
        );
    }
}

export default Content;