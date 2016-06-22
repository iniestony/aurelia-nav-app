import webpack from 'webpack';
import base from './webpack.base';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  ...base,
  module: {
    ...base.module,
    loaders: [
      ...base.module.loaders,
      /* css/scss import in non-entry chunks always used with <style>
      *  css/scss import in entry chunks can be used with <style> or <link>
      *  used with <link>, set as below, must also add a 'new ExtractTextPlugin' inside the plugins section
      *  the import css/scss in each entry chunk into separate files: new ExtractTextPlugin('[name].css')
      *  the import css/scss in each entry chunk into ONE file: new ExtractTextPlugin('vendor.css') */
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
      /* used with <style>, set as below, no need for a 'new ExtractTextPlugin' */
      // {
      //   test: /\.css$/,
      //   loader: "style!css"
      // },
      // {
      //   test: /\.scss$/,
      //   loader: "style!css!sass"
      // }
    ]
  },
  plugins: [
    ...base.plugins,
    /**
     * Plugin: HtmlWebpackPlugin
     * Description: Simplifies creation of HTML files to serve your webpack bundles.
     * This is especially useful for webpack bundles that include a hash in the filename
     * which changes every compilation.
     *
     * See: https://github.com/ampedandwired/html-webpack-plugin
     */
    new HtmlWebpackPlugin({
      template: 'index.html',
      chunksSortMode: 'dependency',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    /**
     * Plugin: CommonsChunkPlugin
     * Description: Shares common code between the pages.
     * It identifies common modules and put them into a commons chunk.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
     * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
     */
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        // bootstrap has to be defined first!
        // otherwise polyfills and PAL will not get initialized at the right time
        'aurelia-bootstrap',
        'aurelia',
        /* 'vendor', */
        /* 'users', // see examples above // */
      ].reverse()
    }),

    /**
     * Plugin: UglifyJsPlugin
     * Description: Minimize all JavaScript output of chunks.
     * Loaders are switched into minimizing mode.
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
     */
    // NOTE: To debug prod builds uncomment //debug lines and comment //prod lines
    new webpack.optimize.UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug

      beautify: false, //prod

      mangle: {
        screw_ie8 : true,
        keep_fnames: true
      }, //prod

      compress: {
        screw_ie8: true,
        warnings: false
      }, //prod

      comments: false //prod
    }),
    
    /**
     * Plugin: ExtractTextPlugin
     */
    new ExtractTextPlugin('[name].css'),
    
    /**
     * Plugin: OfflinePlugin
     * Description: This plugin is intended to provide offline experience for webpack projects. It uses ServiceWorker and AppCache as a fallback under the hood.
     * It always better if OfflinePlugin is the last plugin added 
     * 
     * See: https://github.com/NekR/offline-plugin
     */
    // uncomment this if you want your website to work offline:
    // new OfflinePlugin(),
  ]
}

export default config;
