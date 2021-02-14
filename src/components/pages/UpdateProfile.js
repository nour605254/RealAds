import React, { Component, Fragment } from 'react';
import MetaTags from 'react-meta-tags';

import Content from '../sections/updateprofile/Content';

class UpdateProfile extends Component {
    render() {
        return (
            <Fragment>
                <MetaTags>
                    <title>Update Profile</title>
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

export default UpdateProfile