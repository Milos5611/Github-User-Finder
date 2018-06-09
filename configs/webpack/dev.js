const merge = require("webpack-merge");
const webpack = require("webpack");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: 'development',
    entry: [
        "babel-polyfill",
        "react-hot-loader/patch",
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        "./index.js"
    ],
    devServer: {
        hot: true,
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "window.com.incode": {
                NODE_ENV: JSON.stringify("development"),
                BASE_URL: JSON.stringify("/rest"),
                TOKEN: JSON.stringify()
            }
        })
    ]
});
