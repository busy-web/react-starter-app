/**
 * @module Utils
 *
 */

let { console } = window;
if (!console) {
	console = () => false;
}

/**
 * Throw error if test is not passed
 *
 * @public
 * @method assert
 * @param message {string} the error message to show if test is false
 * @param test {boolean} statement that results to true or false
 * @return {void}
 */
export function assert(message, test) {
	if (typeof message !== 'string') {
		throw new Error("assert() requires the error message to be a string");
	}

	if (!test) {
		console.assert(false, message);
	}
}

export function funcNumArgs(arglen, args, allowLessArgs=false) {
	if (args.length > arglen) {
		console.warn("funcNumArgs: too many arguments for function call");
	} else if (!allowLessArgs && args.length < arglen) {
		console.warn("funcNumArgs: not enough arguments for function call");
	}
}
