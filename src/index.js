

import React from 'react';
import ReactDom from 'react-dom';
import './style.css'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import CryptoContext from './CryptoContext';
import 'react-alice-carousel/lib/alice-carousel.css';




ReactDom.render(
  <BrowserRouter>
    <CryptoContext>
      <App />
    </CryptoContext>
  </BrowserRouter>,
  document.getElementById('root'));
