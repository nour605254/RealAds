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


function App() {
    return (
        <Router>
          <AuthProvider>
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
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
