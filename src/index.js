import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider } from './auth/useAuth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.Fragment>
    <BrowserRouter>
        {/* <AuthProvider> */}
            <App />
        {/* </AuthProvider> */}
    </BrowserRouter>
  </React.Fragment>
);

