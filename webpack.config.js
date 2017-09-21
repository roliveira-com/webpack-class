const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Uglify = require('uglifyjs-webpack-plugin');
const Compress = require('compression-webpack-plugin');

// inserindo plugin para separar codigo css em arquivo separado
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const extractSass = new ExtractTextWebpackPlugin({
    filename: '[name].[contenthash:8].bundle.css',
    disable: false,
});

const minify = {
    collapseWhitespace: true,
    conservativeCollapse: true,
    removeComments: true,
};

const config = {
    entry: {
        main: './app/index.js',
        oldMessages: './app/old-messages.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash:8].bundle.js',
        //  config relativa ao webpack-dev-server
        publicPath: '/',
    },
    plugins: [
        new Uglify(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'commons.[hash:8].bundle.js',
            minChunks: 2,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'index.html'),
            filename: 'index.html',
            chunks: ['main', 'commons'],
            minify,
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app', 'old-messages.html'),
            filename: 'old-messages.html',
            chunks: ['oldMessages', 'commons'],
            minify,
        }),
        extractSass,
        new Compress({
            asset: '[path].gz',
        }),
    ],
    // Carregando loaders no webpack
    // Loaders (ou rules a partir das versões mais recentes do webpack) são basicamente
    // as tasks no gulp/grunt
    module: {
        // Aqui tb pode usar a opção ´loaders´. A opção ´rules´ é mais recente
        // loaders: [
        rules: [
            {
                use: 'html-es6-template-loader',
                test: /\.html$/,
                exclude(filePath) {
                    return filePath === path.join(__dirname, 'app', 'index.html');
                },
                query: {
                    transpile: true,
                },
            },
            {
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/,
                query: {
                    presets: [
                        ['es2015', {
                            modules: false,
                        }],
                    ],
                },
            },
            {
                // regex especificando que esta regra pode ser aplica tanto para arquivos .scss quanto .sass
                // test: /\.(s[ca]ss)$/
                test: /\.scss$/,
                // esta config gera as regras css direto no bundle.js
                // mas o correto é gera-los em um arquivo separado
                // assim configuramos outra config
                // use: [
                //     'style-loader',
                //     'css-loader',
                //     'sass-loader',
                // ],
                use: extractSass.extract({
                    loader: [
                        { loader: 'css-loader' },
                        { loader: 'sass-loader' },
                    ],
                    fallback: 'style-loader',
                }),
            },
            {
                test: /\.(jpe?g|png|gif|svg)/,
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 5000,
                            name: '[name].[hash:8].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                quality: 65,
                            },
                        },
                    },
                ],

            },
        ],
    },
};

// Habilitando live/hot reload na pagina em dev
if (process.env.NODE_ENV === 'dev'){
    config.watch = true;
    config.devtool = 'source-map';
} else if (process.env.NODE_ENV === 'hot') {
    config.devtool = 'source-map';
    // Habilitando Hot Module Reload no devServer
    config.devServer = {
        hot: true,
    };
    //  Habilitando plugin de Hot Module Reload na pagina e inserindo no array de configs...
    //  ...já criado acima
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
