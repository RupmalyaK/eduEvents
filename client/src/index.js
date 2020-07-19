import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom"; 
import store, {persistor} from "./redux/store.js"; 
import {PersistGate} from "redux-persist/integration/react";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
<Provider store = {store}>
    <Router> 
        <PersistGate persistor={persistor}> 
            <App />
        </PersistGate> 
    </Router>
</Provider> 
,document.getElementById('root'));


