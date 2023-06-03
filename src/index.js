import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { Helmet } from 'react-helmet';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
  <Helmet>
      <meta name="description" content="/" />
      <meta property="og:title" content="/" />
      <meta property="og:description" content="/" />
      <meta property="og:image" content="/" />
    </Helmet>

    <App />
    </div>
);
