import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';

import Content from '../sections/register/Content';

class Register extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Register</title>
                    <meta
                        name="description"
                        content="#"
                    />
                </MetaTags>
                <Content />


            </Fragment>
        );
    }
}

export default Register;