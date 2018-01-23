import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import withRoot from '../withRoot';
import { AUTHENTICATED } from '../actions';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/reducer';
import { createStore, applyMiddleware } from 'redux';

const isAuthenticated  = () => {
  const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
  const store = createStoreWithMiddleware(reducers);
  const user = localStorage.getItem('user');
  return user;
};

const PRIVATE_ROOT = '/dashboard';
const PUBLIC_ROOT = '/login';

const AuthRoute = ({component, ...props}) => {
  const { isPrivate } = component;
  if (isAuthenticated()) {
    return isPrivate === true ? <Route { ...props } component={ component } /> : <Redirect to={ PRIVATE_ROOT } />;
  } else {
      return isPrivate === true ? <Redirect to={ PUBLIC_ROOT } /> : <Route { ...props } component={ component } />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ])
};

export default withRoot(AuthRoute);