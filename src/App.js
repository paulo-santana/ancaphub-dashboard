import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import Routes from './routes';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { loadUserRequest } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

export default function App() {
  useEffect(() => {
    store.dispatch(loadUserRequest());
  }, []);

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
