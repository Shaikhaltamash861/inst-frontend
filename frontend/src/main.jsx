import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { persistor, store } from './store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <PersistGate persistor={persistor}>


    <Router>
      <ToastContainer/>
    <App/>
    </Router>
      </PersistGate>
    </Provider>
  </>,
)
