import { resolve } from "path";
import { readdirSync } from "fs";
var nodeModules = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
readdirSync(resolve(__dirname, 'node_modules'))
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

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
	
];
