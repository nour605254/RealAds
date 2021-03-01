import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from "./Contexts/AuthContext"

// Private route
import PrivateRoute from './PrivateRoute'

// Pages
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import ForgetPassword from './components/pages/ForgetPassword'
import UpdateProfile from './components/pages/UpdateProfile'
import Event from './components/pages/Events'
import Ads from './components/pages/Ads'
import Users from './components/pages/Users'
import Profile from './components/pages/Profile'
import Devices from './components/pages/Devices'


function App() {
    return (
        <Router>
            <AuthProvider>
                <Switch>
                    <PrivateRoute exact path="/" component={Home} />
                    <PrivateRoute exact path="/events" component={Event} />
                    <PrivateRoute exact path="/ads" component={Ads} />
                    <PrivateRoute exact path="/users" component={Users} />
                    <PrivateRoute exact path="/profile" component={Profile} />
                    <PrivateRoute exact path="/devices" component={Devices} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/recover" component={ForgetPassword} />
                    <Route exact path="/update-profile" component={UpdateProfile} />
                </Switch>
            </AuthProvider>
        </Router>
    );
}

export default App;
