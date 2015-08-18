module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',
        './app/app.es'
    ],
    output: {
        path: __dirname + '/prod',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    devtool: 'source-map'
};
