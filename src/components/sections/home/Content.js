import React, { Component, Fragment } from 'react';
//import Client from '../../layouts/Client';
import User from './User';
import Event from './Event';
import Ads from './Ads';
import Overview from './Overview';

class Content extends Component {
    render() {
        return (

            
                <div class="main-content">
                    <div class="section__content section__content--p30">
                        <div class="container-fluid">

                            <Overview />
                           
                        </div>
                    </div>
                </div>
            

            
        );
    }
}

export default Content;