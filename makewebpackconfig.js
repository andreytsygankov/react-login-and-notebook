var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var AppCachePlugin = require('appcache-webpack-plugin');

module.exports = function(options) {
  var entry, jsLoaders, plugins, cssLoaders, devtool;

  if (options.prod) {
    entry = [
      path.resolve(__dirname, 'js/app.js')
    ];
    cssLoaders = ['file-loader?name=[path][name].[ext]', 'postcss-loader'];
    plugins = [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      })
      //new AppCachePlugin({
       // exclude: ['.htaccess']
      //})
    ];

  } else {
    devtool = 'cheap-eval-source-map';
    entry = [
      "webpack-dev-server/client?http://localhost:3000",
      "webpack/hot/only-dev-server",
      path.resolve(__dirname, 'js/app.js')
    ];
    cssLoaders = ['style-loader', 'css-loader', 'postcss-loader'];
    plugins = [
      new webpack.HotModuleReplacementPlugin(),
      // new AppCachePlugin()
    ]
  }

  return {
    devtool: devtool,
    entry: entry,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: "js/bundle.js",
      publicPath: ''
    },
    module: {
      loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: path.join(__dirname, '/node_modules/')
        }, {
          test:   /\.css$/,
          loaders: cssLoaders
        }, {
          test: /\.jpe?g$|\.gif$|\.png$/i,
          loader: "url-loader?limit=10000"
        }
      ]
    },
    plugins: plugins,
    postcss: function() {
      return [
        require('postcss-import')({
          onImport: function (files) {
              files.forEach(this.addDependency);
          }.bind(this)
        }),
        require('postcss-simple-vars')(),
        require('postcss-focus')(),
        require('autoprefixer')({
          browsers: ['last 2 versions', 'IE > 8']
        }),
        require('postcss-reporter')({
          clearMessages: true
        })
      ];
    },
    target: "web",
    stats: false,
    progress: true
  }
}
