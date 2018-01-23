import React from 'react';
import { FormattedMessage } from 'react-intl';
import Dashboard from '../pages/dashboard';
import Login from '../pages/login';


const routes = [
    { path: '/dashboard',
      exact: true,
      sidebar: () => <div />,
      main: () => <Dashboard />
    },
];
export default routes;