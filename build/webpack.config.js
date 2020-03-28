const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const kPagesDir = path.join('src', 'pages', path.sep);

function getFilesPathFromDirectory(dir, allowedTypes) {
	const res = [];
	function checkDir(dirPath) {
		const files = fs.readdirSync(dirPath);
		for (let i in files) {
			const curFile = path.join(dirPath, files[i]);      
			if (fs.statSync(curFile).isFile() && allowedTypes.indexOf(path.extname(curFile)) != -1) {
				res.push(curFile);
			} else if (fs.statSync(curFile).isDirectory()) {
				checkDir(curFile);
			}
		}
	};
	checkDir(dir);
	return res;
}

const jsFilesPath = getFilesPathFromDirectory(kPagesDir, ['.js']);
const entry = jsFilesPath.reduce((res, filePath) => {
const chunkName = filePath.replace(path.extname(filePath), '').replace(kPagesDir, '').split('/')[0];
	res[chunkName] = `./${filePath}`;
	return res;
}, {});

const htmlFilesPath = getFilesPathFromDirectory(kPagesDir, ['.html']);
const plugins = htmlFilesPath.map(filePath => {
	const pageName = filePath.replace(path.extname(filePath), '').replace(kPagesDir, '').split('/')[0];
	const opts = {
		hash: true,
		template: `./${filePath}`,
		chunks: [pageName],
		filename: `./${pageName}.html`
	};
	return new HtmlWebpackPlugin(opts);
});

module.exports = {
	entry,
	output: {
		filename: './[name].bundle.js' 
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			ui: path.resolve(__dirname, '../src', 'ui')
		}
	},
	plugins
}