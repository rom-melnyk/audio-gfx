module.exports = {
    entry: [
        //'webpack/hot/only-dev-server',
        //'webpack-dev-server/client?http://localhost:8080',
        './app/app.es6'
    ],
    output: {
        path: __dirname + '/bundle',
        publicPath: '/bundle/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.es6?$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    debug: true,
    devtool: 'source-map',
    devServer: {
        hot: true,
        inline: true
    }
};
