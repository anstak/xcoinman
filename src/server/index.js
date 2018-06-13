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
import {loadPages, loadPosts, loadNews, loadComments} from '../common/actions/wordpress'
import {toggleActiveCrypto, setAmountCrypto} from '../common/actions/exchangeInfo'
import xml from 'xml';
import axios from 'axios';
import ReactDOMServer from 'react-dom/server';
import {Helmet} from "react-helmet";
var fs = require('fs');
const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

// https://crypt.codemancers.com/posts/2017-06-03-reactjs-server-side-rendering-with-router-v4-and-redux/
// https://github.com/wellyshen/react-cool-starter/blob/master/src/server.js
// http://astronautweb.co/react-static-sites/

if (process.env.NODE_ENV === 'production') {
  server.get('/*', function(req, res, next) { // redirect from https to http
    if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'].indexOf("https") < 0 || req.headers.host.match(/^www/) !== null) {
      res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
      next();     
    }
  })
}


// server.get("/json_static/*", (req, res) => {
//   fs.readFile("." + req.url, function(err, data) {  
//     if (err) {  
//       res.send(err);  
//     } else {  
//       res.set('Content-Type', 'text/json');
//       res.send(data);  
//     }  
//   });   
// })

server.get("/rates.xml", (req, res) => {
  axios.get('https://shapeshift.io/marketinfo/')
    .then(function (response) {
      var map = {rates: []}
      response.data.forEach(function(pair) {
        var symbols = pair.pair.split("_");
        map.rates.push({
          item: [
            { from: symbols[0] },
            { to: symbols[1] },
            { in: 1 },
            { out: (pair.rate*1).toFixed(8) },
            { amount: pair.limit.toFixed(8) },
            { minfee: pair.minerFee.toFixed(8) },
            { minamount: pair.min.toFixed(8) },
            { maxamount: pair.maxLimit.toFixed(8) },
            { param: "floating" }
          ]
        })
      })
      res.set('Content-Type', 'text/xml');
      res.send(xml(map));
    })
    .catch(function (error) {
      console.log(error);
    });  
})

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const store = configureStore();

    var promises = []
    if (req.url == "/" || /\/(\w+)-to-(\w+)/.test(req.url)) {
      promises.push(store.dispatch(loadAllPaymentSystems()))
      promises.push(store.dispatch(loadComments(req.headers.host)))
      promises.push(store.dispatch(loadNews(req.headers.host)))
    }
    if (/\/(\w+)-to-(\w+)/.test(req.url)) {
      var pair = req.url.match(/\/(\w+)-to-(\w+)/);
      promises.push(store.dispatch(toggleActiveCrypto(pair[1], "from")))
      promises.push(store.dispatch(toggleActiveCrypto(pair[2], "to")))
    }
    if (req.url == "/reviews") {
      promises.push(store.dispatch(loadComments(req.headers.host)))
    }
    if (req.url == "/news") {
      promises.push(store.dispatch(loadNews(req.headers.host)))
    }
    promises.push(store.dispatch(loadPages(req.headers.host)))

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


      const helmet = Helmet.renderStatic();
      // Grab the initial state from our Redux store
      const finalState = store.getState();

res.send(`<!doctype html>
<html lang="">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta charSet='utf-8' />
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
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
</html>`);
    });
  });

export default server;
