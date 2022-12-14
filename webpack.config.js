const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// webpack properties: entry, output, and mode
// modifying for multiple entry points - for each of our pages
module.exports = {
  // root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
  entry: {
    app: './assets/js/script.js',
    events: './assets/js/events.js',
    schedule: './assets/js/schedule.js',
    tickets: './assets/js/tickets.js'
  },
  // output that bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist, which is short for distribution
  output: {
    path: path.join(__dirname + '/dist'),
    // build will create a series of bundled files for each entry object
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name(file) {
                return '[path][name].[ext]';
              },
              publicPath(url) {
                return url.replace('../', '/assets/');
              }
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static' // the report outputs to an HTML file in the dist folder
    })
  ],
  mode: 'development'
};
