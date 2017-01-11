var webpack = require('webpack');
var colors = require('colors');
var fs = require('fs');
var dest = './dist/';
var lib = './lib/';
var pluginDir = './lib/plugins/';
var configFile = JSON.parse(fs.readFileSync('./config.json'));

//纯框架模块+pluginUtil
var allPart = configFile.independent;
var config = JSON.parse(fs.readFileSync('./main.json'));
var plugin = configFile.plugin;
var main = config.main;
var selectPart = main && main.selectPart;
var entryObj = {
    'JSpring' : [lib + 'JSpring.js', lib + 'JSpring.css'],
    'JSpring.debug' : [lib + 'JSpring.js', lib + 'JSpring.css'],
    'JSpring.full' : [lib + 'JSpring.js', lib + 'JSpring.css']
};
var plugins = [new webpack.optimize.DedupePlugin()];

if (process.env.NODE_ENV != 'development') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

//加载框架包含模块
console.log('Now load the module files...'.yellow);
console.log('+------------------------------------------------------------+'.green);

plugin.forEach(function (pl) {
    var js = pluginDir + pl + '/' + pl + '.js';
    entryObj[pl] = js;
    console.log('+ ', js.magenta);
});
console.log('');


selectPart.forEach(function (f) {
    var js = lib + 'JSpring.' + f + '.js';
    entryObj['JSpring'].push(js);
    entryObj['JSpring.debug'].push(js);
    console.log('+ ', js.magenta);
});

allPart.forEach(function (f) {
    var js = lib + 'JSpring.' + f + '.js';
    entryObj['JSpring.full'].push(js);
});
console.log('+------------------------------------------------------------+'.green);
console.log('Load the module files...DONE\n'.yellow);
console.log('Now package the files...\n'.yellow);

module.exports = {
    //页面入口
    entry: entryObj,
    //出口文件输出配置
    output: {
        path: dest, //js位置
        publicPath: dest, //web打包的资源地址
        filename: '[name].min.js'
    },
    // devtool: '#source-map',//source map 支持
    watchOptions: [lib + '**.js', lib + '*/**.js', lib + '**.css'], //监控脚本
    plugins: plugins,
    //加载器
    module: {
        preLoaders: [{
            test: /\.js$/,
            loader: "eslint-loader?{rules:{semi:0}}",
            exclude: /node_modules/,
        }],
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.html$/,
            loader: "html-loader"
        }, {
            test: /\.tpl$/,
            loader: "html-loader"
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /.*\.(png|jpg|jpe?g|ico|gif|svg)$/i,
            loaders: [
                'image-webpack?{progressive:true, optimizationLevel: 3, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
                'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            ]
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
}