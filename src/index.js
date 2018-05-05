import express from 'express';
import app from './server';
var proxy = require('http-proxy-middleware');
var config = require('../config')

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

var server = express();

server.use('/api', proxy({target: config.server, changeOrigin: true}));
server.use('/json_static', proxy({target: config.wordpress, changeOrigin: true}));

server.use((req, res) => app.handle(req, res))
.listen(port, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`> Started on port ${port}`);
});

export default server

