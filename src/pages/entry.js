import React from 'react';
import withRoot from '../withRoot';
import PersistentDrawer from '../naviBar';
import Login from './login';
import AuthRoute from '../routes/authRoute';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers/reducer';
import { AUTHENTICATED } from '../actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

class Entry extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <AuthRoute component={Login} path="/login" />
            <AuthRoute component={PersistentDrawer} path="/dashboard" />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default withRoot(Entry);