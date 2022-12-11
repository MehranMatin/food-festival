const path = require("path");
module.exports = {
  // root of the bundle and the beginning of the dependency graph, so give it the relative path to the client's code
  entry: './assets/js/script.js',
  // output that bundled code to a folder that we specify. It is common and best practice to put your bundled code into a folder named dist, which is short for distribution
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js'
  },
  mode: 'development'
};

