const webpack = require('webpack');
const path = require('path');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = (env, argv) => {
  let URL_API  = 'http://localhost:3000/';
  if(argv.mode === 'production') {
    URL_API  = 'https://remote.com/';
  }

  console.log("--- Webpack mode:", argv.mode);
  console.log("--- URL_API:", URL_API);

  const plugins = [
    new webpack.DefinePlugin({
      URL_API:  JSON.stringify(URL_API),
    })
  ];

  if(argv.mode === 'production') {
    plugins.push(new MinifyPlugin({}, {}));
  }

  const config = {
    entry: path.join(__dirname, '/src/index.js'),
    output: {
      path: path.join(__dirname, './dist/'),
      filename: 'shopify-script-tag.js'
    },
    plugins,
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
