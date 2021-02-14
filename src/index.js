import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// Fontface CSS 
import './assets/css/font-face.css';
import './assets/vendor/font-awesome-4.7/css/font-awesome.min.css';
import './assets/vendor/font-awesome-5/css/fontawesome-all.min.css';
import './assets/vendor/mdi-font/css/material-design-iconic-font.min.css';

// Bootstrap CSS
import './assets/vendor/bootstrap-4.1/bootstrap.min.css';

// Vendor CSS
import './assets/vendor/animsition/animsition.min.css';
import './assets/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css';
import './assets/vendor/wow/animate.css';
import './assets/vendor/css-hamburgers/hamburgers.min.css';
import './assets/vendor/slick/slick.css';
import './assets/vendor/select2/select2.min.css';
import './assets/vendor/perfect-scrollbar/perfect-scrollbar.css';

// Main CSS
import './assets/css/theme.css';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
