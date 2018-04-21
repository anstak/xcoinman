import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import App from '../common/containers/App';
import {BrowserRouter} from 'react-router-dom'
import '../assets/app.scss';

const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
	<BrowserRouter>
		<App />
	</BrowserRouter> 
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
