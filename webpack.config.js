// Add WebPack to use the included CommonsChunkPlugin
var webpack = require('webpack');
var node_modules = __dirname + '/node_modules/';

var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },

    // We split the entry into two specific chunks. Our web and vendors. Vendors
    // specify that react and reqwest should be part of that chunk
    entry: {
        web: ['./src/index.js'],
        vendors: ['d3']
    },

    resolve: { alias: {} },

    // We add a plugin called CommonsChunkPlugin that will take the vendors chunk
    // and create a vendors.js file. As you can see the first argument matches the key
    // of the entry, "vendors"
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ],
    output: {
        path: './public',
        filename: 'bundle.js'
    },
    module: {
        noParse: [],
        loaders: [
            { test: /\.js$/, loader: 'babel-loader' },
        ]
    }
};

config.addVendor('d3', node_modules + 'd3/d3.min.js');

module.exports = config;

