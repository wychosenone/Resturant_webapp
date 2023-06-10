import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Helmet } from 'react-helmet';
import { BrowserRouter } from 'react-router-dom';





const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <script src="https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js"></script>
  <Helmet>
      <meta name="description" content="/" />
      <meta property="og:title" content="/" />
      <meta property="og:description" content="/" />
      <meta property="og:image" content="/" />
    </Helmet>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </div>
);
