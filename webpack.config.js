const path = require('path');

module.exports = {
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'index.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2'],
        },
      },
      {
        test: /\.(jpe?g)$/i,
        loaders: [
            'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
            'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      {
        test: /\.(svg)$/i,
        loaders: [
          'svg-inline-loader'
        ]
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]
  }
}
