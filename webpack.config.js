const webpack = require('webpack');
const path = require('path');
require("dotenv/config");

module.exports = (env, argv) => {
  console.log("--- Webpack mode:", argv.mode);
  console.log("--- URL_API:", process.env.URL_API);

  const plugins = [
    new webpack.DefinePlugin({
      URL_API:  JSON.stringify(process.env.URL_API),
    })
  ];

  const config = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, './dist/'),
      filename: 'shopify-script-tag.js'
    },
    plugins,
    optimization: {
      minimize: argv.mode === 'production'
    },    
    module : {
      rules : [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use : {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }          
          }
        }
      ]
    }
  };

  return config;
}
