var jeet = require('jeet');
var rupture = require('rupture');
var autoprefixer = require('autoprefixer-stylus');

module.exports = {
    entry: "./frontend/app.coffee",
    output: {
        path: process.cwd() + '/public',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.coffee$/, loader: "coffee-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee', '.styl', '.css'] 
    },
    stylus: {
        use: [jeet(), rupture(), autoprefixer()]
    }
};