var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath,
	stats: {
		colors: true
	},
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5566, 'localhost', function(err) {
	if (err) {
		console.log('err', err);
		return;
	}
	console.log('Listen at http://localhost:5566');
});