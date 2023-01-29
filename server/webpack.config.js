import webpack from "webpack";
import path from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { readdirSync } from "fs";
var nodeModules = {};

// note the path.resolve(__dirname, ...) part
// without it, eslint-import-resolver-webpack fails
// since eslint might be invoked with different cwd
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

readdirSync(resolve(__dirname, "node_modules"))
	.filter((x) => [".bin"].indexOf(x) === -1)
	.forEach((mod) => {
		nodeModules[mod] = `commonjs ${mod}`;
	});

// es5 style alternative
// fs.readdirSync(path.resolve(__dirname, 'node_modules'))
//     .filter(function(x) {
//         return ['.bin'].indexOf(x) === -1;
//     })
//     .forEach(function(mod) {
//         nodeModules[mod] = 'commonjs ' + mod;
//     });

export const name = "server";
export const target = "node";
export const entry = "./index.js";
export const output = {
	path: "./bin/",
	publicPath: "bin/",
	filename: "serverEntryPoint.js",
};
export const externals = nodeModules;
export const module = {
	loaders: [
		{
			test: /\.js$/,

			loaders: [
				// 'imports?document=this',
				// 'react-hot',
				"babel-loader",
				//,'jsx-loader'
			],
		},
		{ test: /\.json$/, loader: "json-loader" },
	],
};
export const plugins = [
	// new webpack.NormalModuleReplacementPlugin("^(react-bootstrap-modal)$", "^(react)$")
	// new webpack.IgnorePlugin(new RegExp("^(react-bootstrap-modal)$"))
	// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];
