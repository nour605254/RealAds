import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';

import Content from '../sections/login/Content';

class Login extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Login</title>
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

export default Login;