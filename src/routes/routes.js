import React from 'react';
import Dashboard from '../pages/dashboard';

const routes = [
    { path: '/dashboard',
      exact: true,
      sidebar: () => <div />,
      main: () => <Dashboard />
    },
];
export default routes;