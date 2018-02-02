const port = process.env.PORT || 8080;
const routes = require('./routes');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const isProduction = process.env.NODE_ENV === 'production';
const publicPath = express.static(path.join(__dirname, '../../dist'));
const tempDir = path.join(__dirname, './temp');
const tempPath = express.static(tempDir);
const app = express();

const applyHotReload = app => {
  const compiler = require('webpack')(require('../../build/webpack.config'));

  const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist',
    quiet: true,
    logLevel: 'silent',
    stats: 'errors-only'
  });

  const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  });

  // force page reload when html-webpack-plugin template changes
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({ action: 'reload' })
      cb()
    })
  });

  // handle fallback for HTML5 history API
  app.use(require('connect-history-api-fallback')());

  // serve webpack bundle output
  app.use(devMiddleware);

  // enable hot-reload and state-preserving
  // compilation error display
  app.use(hotMiddleware);

  // reading and serving index.html from memory
  app.use('/', (req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function(err, result){
      if (err) {
        next();
      }
      res.set('content-type','text/html');
      res.send(result);
      res.end();
    });
  });

  devMiddleware.waitUntilValid(() => 0);
};

// Creating the temp directory if it does not exists.
if (!fs.existsSync(tempDir)) { fs.mkdirSync(tempDir); }

app.use('/dist', publicPath);
app.use('/temp', tempPath);
app.use(bodyParser.json());
app.use('/api/v1', routes);

// Adding the hot reloading feature when not working on production
if (isProduction) {
  app.use('/', (_, res) => res.sendFile(path.join(__dirname, '../../dist/index.html')));
}

if (!isProduction) { applyHotReload(app) }


app.listen(port, () => {
  console.log(`HTTP SERVER => Listening on port:${port}`); // eslint-disable-line
});
