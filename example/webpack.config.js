const basedir = require('path').dirname(__filename);

module.exports = {
  entry: `${basedir}/index.js`,

  module: {
    loaders: [{
      loader: `babel-loader`,
      test: /\.js$/
    }]
  },

  output: {
    filename: `example.js`,
    path: basedir
  },

  resolve: {
    extensions: [ ``, `.js` ]
  }
};
