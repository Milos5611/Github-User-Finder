// shared config (dev and prod)
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    resolve: {
        extensions: [ ".js", ".jsx" ]
    },
    context: resolve(__dirname, "../../src"),
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    failOnError: false,
                    emitWarning: true
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    cacheDirectory: true,
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    { loader: "css-loader", options: { importLoaders: 1 } },
                    {
                        loader: "postcss-loader", options: {
                            ident: "postcss",
                            plugins: () => [
                                postcssPresetEnv({
                                    stage: 4,
                                    features: {
                                        "nesting-rules": true
                                    }
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        { loader: "css-loader" },
                        {
                            loader: "postcss-loader", options: {
                                ident: "postcss",
                                plugins: () => [
                                    postcssPresetEnv({
                                        stage: 4,
                                        features: {
                                            "nesting-rules": true
                                        }
                                    })
                                ]
                            }
                        },
                        "resolve-url-loader",
                        { loader: "sass-loader", options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    "file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
                    "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false"
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: "file-loader?name=www/fonts/[name].[ext]"
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    plugins: [
        // Extract sass then postcss to css
        new ExtractTextPlugin({
            filename: "app.[hash].css",
            allChunks: true
        }),
        new HtmlWebpackPlugin(
            {
                template: "www/index.ejs",
                filename: "index.html",
                inject: true
            }),
    ],
    performance: {
        hints: false
    }
};
