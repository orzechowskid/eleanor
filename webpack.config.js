const webpack = require('webpack');

/* common config options */

let webpackConfig = {
  entry: `./src/index.js`,

  module: {
    loaders: [{
      loader: `babel-loader`,
      test: /\.js$/
    }]
  },

  resolve: {
    extensions: [ ``, `.js` ]
  }
};

/* env-specific config options */

switch (process.env.NODE_ENV) {

  case `development`:

    webpackConfig = Object.assign({}, webpackConfig, {
      output: {
        filename: `eleanor.js`,
        library: true,
        libraryTarget: `commonjs2`,
        path: `${__dirname}/dev`
      }
    });

    break;

  case `production`:

    webpackConfig = Object.assign({}, webpackConfig, {
      output: {
        filename: `eleanor.js`,
        library: true,
        libraryTarget: `commonjs2`,
        path: `${__dirname}/dist`
      },
      plugins: [
        new webpack.optimize.UglifyJsPlugin({
          minimize: true
        })
      ]
    });

    break;
  default:
}

module.exports = webpackConfig;
