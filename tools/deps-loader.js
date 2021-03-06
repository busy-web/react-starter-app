/**
 * @module config
 *
 */
const path = require('path');
//const loader = require('babel-loader');

/**
 * Webpack loader to add dependency files when loading a file
 *
 */
let logged = false;
module.exports = function(content, inputSourceMap, meta) {
	let [ start, end ] = content.split('/***/');
	let cwd = path.dirname(__dirname);
	let options = this.query;

	let aliasKey = './';
	if (options.alias) {
		aliasKey = Object.keys(options.alias)[0];
		cwd = options.alias[aliasKey];
	}

	if (!options.include || options.include.test(this.resourcePath)) {
		if (options.deps) {
			if (!logged) {
				logged = true;
				console.log(content);
				//console.log(this);
			}

			if (options.deps.length > 1) {
				options.deps.forEach(dep => {
					start += addDep(this, start, cwd, aliasKey, dep);
				});
			} else {
				let dep = options.deps[0];
				start += addDep(this, start, cwd, aliasKey, dep);
			}
			content = start + (end || '');
		}
	}

	this.callback(null, content, inputSourceMap, meta);
};

function addDep(target, includes, cwd, aliasKey, dep) {
	let dir = path.resolve(cwd, dep);

	target.fs.readdirSync(dir).forEach(function(file) {
		let name = path.basename(file, '.js');
		includes += `\nimport ${file} from '${aliasKey}/${dep}/${name}'`;
	});
	return includes;
}

function clearConsole(webpack, module) {
	console.log('finishRebuildingModules', webpack, module);
}
