import express from 'express';
import app from './server';
var proxy = require('http-proxy-middleware');

if (module.hot) {
  module.hot.accept('./server', function() {
    console.log('🔁  HMR Reloading `./server`...');
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT || 3000;

var server = express();

server.use('/api', proxy({target: 'http://93.170.131.108', changeOrigin: true}));

server.use((req, res) => app.handle(req, res))
.listen(port, function(err) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`> Started on port ${port}`);
});

export default server

