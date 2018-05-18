/**
 * @module Config
 *
 */
//const path = require('path');

module.exports = (/*{ file, env }*/) => {
	//let outname = path.basename(file.basename, file.extname) + '.prf' + file.extname;
	//console.log('ctx.env', file, env, 'to: ', outname);

	/* let env = ctx.env || 'development'; */
	return {
		parser: false, //'autoprefixer',
		//syntax: 'postcss-scss',
		/* map: false, //{},
		from: file.basename,
		to: path.join('styles', outname), */
		plugins: false
		/* {
			'autoprefixer': { },
			//'postcss-plugin': 'autoprefixer'
		} */
	}
}
