module.exports = {
    entry: ['./app/app.es6'],
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
