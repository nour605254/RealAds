import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';

import Content from '../sections/forgetpassword/Content';

class ForgetPassword extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Recover</title>
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

export default ForgetPassword