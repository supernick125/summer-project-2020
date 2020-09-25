import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoute from './routes/index';

import { Provider as AuthProvider } from './context/Auth';

export default (props) => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <AppRoute />
        </AuthProvider>
      </Router>
    </div>
  );
}
