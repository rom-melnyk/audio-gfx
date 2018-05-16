const path = require('path');

module.exports = {
    entry: [ './app/app.ts' ],
    output: {
        path: path.join(__dirname, '/demo/js'),
        publicPath: '/js/',
        filename: 'script.js'
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        inline: true
    }
};
