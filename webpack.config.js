const path = require('path');
const { ModuleFederationPlugin } = require("webpack").container;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: './src/index',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        port: 8080,
    },
    output: {
        path: path.join(__dirname, 'build'),
        publicPath: 'auto',
    },
    module: {
        rules: [
            {
                test: /bootstrap\.js$/,
                loader: 'bundle-loader',
                options: {
                    lazy: true,
                },
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
          name: 'primary-app',
          remotes: {
                'secondary-app': "secondary-app@http://localhost:3000/remoteEntry.js",
          },
          shared: {
              react: {
                  singleton: true
                },
              'react-dom': {
                  singleton: true
                }
            },
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
    ],
    resolve: {
        extensions: ['.jsx', '.js'],
    }
};

module.exports = config;
