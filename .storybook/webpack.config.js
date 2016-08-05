var webpack = require('webpack')

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /\.scss$/, loaders: ['style', 'css', 'postcss-loader?browsers=last 3 versions', 'sass'] },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(ttf.*|woff2.*|eot.*|woff.*|svg.*|png|gif|jpe?g)$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json' }
    ]
  },
  plugins: [new webpack.DefinePlugin({'ENV': '"storybook"'})]
}
