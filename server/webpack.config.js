// PATH
import { resolve } from "path";
const SRC_DIR = resolve(__dirname, "./src");
const DIST_DIR = resolve(__dirname, "./dist");

// PLUGIN
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin, {
	loader as _loader,
} from "mini-css-extract-plugin";

// OTHER ! TODO: const devMode = process.env.NODE_ENV !== 'production';...
var mode1 = "production";
/**
 * ! Fix for:
 * ! [webpack v5] Error: Universal Chunk Loading is not implemented yet #11660
 * ! https://github.com/webpack/webpack/issues/11660
 * ! chunkLoading: false,
 * ! wasmLoading: false,
 */
var target = "web";

if (process.env.NODE_ENV === "production") {
	mode1 = "production";
}

export const mode = mode1;
export const entry = {
	index: SRC_DIR + "/index.js",
};
export const output = {
	path: DIST_DIR,
	//assetModuleFilename: "images/[name][ext][query]",
	chunkLoading: false,
	wasmLoading: false,
};
export const module = {
	rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader",
			},
		},
		{
			// For pure CSS - /\.css$/i,
			// For Sass/SCSS - /\.((c|sa|sc)ss)$/i,
			// For Less - /\.((c|le)ss)$/i,
			test: /\.((c|sa|sc)ss)$/i,
			use: [_loader, "css-loader", "postcss-loader", "sass-loader"],
		},
	],
};
export const devtool = "source-map";
export const target = target;
export const devServer = {
	contentBase: "./dist",
	hot: true,
};
export const plugins = [
	// Automatically remove all unused webpack assets on rebuild
	// default: true
	new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
	/*new CleanWebpackPlugin(),*/
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		template: SRC_DIR + "/index.html",
	}),
];
