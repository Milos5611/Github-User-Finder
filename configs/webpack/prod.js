// production config
const merge = require("webpack-merge");
const { resolve } = require("path");
const webpack = require("webpack");

const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: 'production',
    entry: [
        "babel-polyfill",
        "./index.js"
    ],
    output: {
        filename: "bundle.[hash].min.js",
        path: resolve(__dirname, "../../build"),
        publicPath: "/"
    },
    devtool: "source-map",
    plugins: [
        new webpack.DefinePlugin({
            "window.com.incode": {
                NODE_ENV: JSON.stringify("production"),
                BASE_URL: JSON.stringify("/rest"),
                TOKEN: JSON.stringify()
            }
        })
    ]
});
