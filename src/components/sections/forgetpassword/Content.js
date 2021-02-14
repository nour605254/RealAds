import React, { Component, Fragment } from 'react';

import ForgetPassword from './ForgetPassword';
import { AuthProvider } from "../../../Contexts/AuthContext"

class Content extends Component {
    render() {
        return (
            <AuthProvider>
                <Fragment>

                    <ForgetPassword />

                </Fragment>
            </AuthProvider>
        );
    }
}

export default Content;