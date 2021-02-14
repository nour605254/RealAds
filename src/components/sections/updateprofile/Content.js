import React, { Component, Fragment } from 'react';

import UpdateProfile from './UpdateProfile';
import { AuthProvider } from "../../../Contexts/AuthContext"

class Content extends Component {
    render() {
        return (
            <AuthProvider>
                <Fragment>

                    <UpdateProfile />

                </Fragment>
            </AuthProvider>
        );
    }
}

export default Content;