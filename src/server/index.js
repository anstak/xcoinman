import App from '../common/containers/App';
import { Provider } from 'react-redux';
import React from 'react';
import configureStore from '../common/store/configureStore';
import express from 'express';
import { fetchCounter } from '../common/api/counter';
import qs from 'qs';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import {StaticRouter} from 'react-router-dom'
import {loadAllPaymentSystems} from '../common/actions/paymentSystems'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

// https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
// https://github.com/wellyshen/react-cool-starter/blob/master/src/server.js

server.get('/*', function(req, res, next) { // redirect from https to http
  if (typeof req.connection.encrypted === 'undefined' || req.headers.host.match(/^www/) !== null) {
    res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
  } else {
    next();     
  }
})

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const store = configureStore();

    const promises = [store.dispatch(loadAllPaymentSystems())]

    return Promise.all(promises).then((response) => {
      let context = {};
      // Render the component to a string
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      // Grab the initial state from our Redux store
      const finalState = store.getState();

      res.send(`
        <!doctype html>
          <html lang="">
          <head>
              <meta http-equiv="X-UA-Compatible" content="IE=edge" />
              <meta charSet='utf-8' />
              <title>Razzle Redux Example</title>
              <meta name="viewport" content="width=device-width, initial-scale=1">
              ${assets.client.css
                ? `<link rel="stylesheet" href="${assets.client.css}">`
                : ''}
                ${process.env.NODE_ENV === 'production'
                  ? `<script src="${assets.client.js}" defer></script>`
                  : `<script src="${assets.client.js}" defer crossorigin></script>`}
          </head>
          <body>
              <div id="root">${markup}</div>
              <script>
                window.__PRELOADED_STATE__ = ${serialize(finalState)}
              </script>
          </body>
        </html>
      `);
    });
  });

export default server;
