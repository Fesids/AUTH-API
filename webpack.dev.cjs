const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dev-build'),
    publicPath: '/',
    filename: '[name].cjs',
    clean: true
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }

}
