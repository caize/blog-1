var path = require('path');
var webpack = require('webpack');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
	devtool: 'source-map',
	entry: [
		path.join(__dirname, 'client/blog.js')
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': "'production'"
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		})
	],
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel',
			include: path.join(__dirname, 'client'),
			query: {
				plugins: [
					["react-transform", {
						transforms: [{
							transform: "react-transform-hmr",
							imports: ["react"],
							locals: ["module"]
						}]
					}]
				]
			}
		}, {
			test: /\.scss$/,
			loader: 'style-loader!css-loader!postcss-loader!sass'
		}]
	},
	postcss: function() {
		return [precss, autoprefixer];
	}
}