var path = require("path");
var webpack = require('webpack');

var PROD = process.env.NODE_ENV === 'production';

module.exports = {
    devtool: "inline-source-map",
    entry: ["./client/js/main.js"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: PROD ? "bundle.min.js" : "bundle.js",
        publicPath: "/"
    },
    plugins: PROD ? [new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })] :
        [],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: "babel-loader",
            exclude: /node_modules/,
            query: {
                plugins: ['transform-decorators-legacy'],
                presets: ['react', 'es2015']
            }
        }]
    }
}