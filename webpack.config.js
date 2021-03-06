const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/ream.js',
  output: {
    filename: './dist/ream.min.js',
    path: path.resolve(__dirname),
    library: 'ream',
    libraryTarget: 'umd',
    globalObject: 'this', // https://medium.com/@JakeXiao/window-is-undefined-in-umd-library-output-for-webpack4-858af1b881df
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
