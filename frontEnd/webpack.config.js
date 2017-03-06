const webpack = require('webpack');

var path = require('path');

// var nodeEnv = process.env.NODE_ENV || 'development';
// var isProd = nodeEnv === 'production';

var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'cheap-module-source-map' : 'eval',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        BACK_URL: '"'+process.env.BACK_URL+'"',
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunks
  ]
};
