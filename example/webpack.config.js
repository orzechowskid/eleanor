module.exports = {
    entry: `./example/index.js`, /* relative to project root */

    module: {
        loaders: [{
            loader: `babel-loader`,
            test: /\.js$/
        }]
    },

    output: {
        filename: `example.js`,
        path: `./example`
    },

    resolve: {
        extensions: [ ``, `.js` ]
    }
};
