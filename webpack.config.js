const path = require('path');
const isProductionMode = process.env.NODE_ENV === "production";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');

module.exports = {
    mode: isProductionMode ? "production" : "development",
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: path.resolve(__dirname, 'css'),
        publicPath: "/css"
    },
    resolve: {
        extensions: ['.css', '.scss'],
        alias: {
            '~': path.resolve(process.cwd(), 'src'),
        }
    },
    entry: {
        "styles": './scss/index.scss',
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.scss$/i,
    //             use: [
    //                 MiniCssExtractPlugin.loader,
    //                 "style-loader",
    //                 "css-loader",
    //                 {
    //                     loader: "sass-loader",
    //                     options: {
    //                         implementation: require("sass"),
    //                     },
    //                 },
    //             ],
    //         },
    //     ],
    // },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS, set url = false to prevent following urls to fonts and images.
          { loader: "css-loader", options: { url: false, importLoaders: 1 } },
          // Load the SCSS/SASS
          { loader: 'sass-loader' },
        ],
      },
    ],
  },

    plugins: [
        new MiniCssExtractPlugin({
            filename: isProductionMode ? "[name].[contenthash].css" : "[name].css",
        }),
    ],

};