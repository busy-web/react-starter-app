/**
 * @module Utils
 *
 */

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
		throw new Error(message);
	}
}
