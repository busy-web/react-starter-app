/**
 * @module Utils
 *
 */

function truncate(v) {
	return v - v%1;
}

export default class Time {
	constructor(year, month, day, hours, minutes, seconds, milliseconds) {
		if (milliseconds) {
			this.__date__ = new Date(year, month, day, hours, minutes, seconds, milliseconds);
		} else if (seconds) {
			this.__date__ = new Date(year, month, day, hours, minutes, seconds);
		} else if (minutes) {
			this.__date__ = new Date(year, month, day, hours, minutes);
		} else if (hours) {
			this.__date__ = new Date(year, month, day, hours);
		} else if (day) {
			this.__date__ = new Date(year, month, day);
		} else if (month) {
			this.__date__ = new Date(year, month);
		} else if (year) {
			this.__date__ = new Date(year);
		} else {
			this.__date__ = new Date();
		}
	}

	format(f) {
		return mapFormat(this.__date__, f);
	}

	timestamp() {
		return this.__date__.getTime() - (this.timezone()*1000);
	}

	unix() {
		return truncate(this.__date__.getTime()/1000) - this.timezone();
	}

	timezone() {
		return this.__date__.getTimezoneOffset()*60;
	}

	valueOf() {
		return this.toString();
	}

	toString() {
		return this.format('YYYY-MM-DD HH:mm:ss');
	}

	[window.Symbol.toPrimitive]() {
		return this.toString();
	}

	/**
	 * get the current time in milliseconds
	 *
	 * @static
	 * @public
	 * @method now
	 * @return {number} timestamp in milliseconds
	 */
	static now() {
		return Date.now();
	}

	/**
	 * the current timestamp in seconds or if seconds is
	 * passed in, a new Time will be created using the seconds
	 *
	 * @static
	 * @public
	 * @method timestamp
	 * @param secs {number} a timestamp in seconds
	 * @return {number|Time} returns the timestamp if a timestamp was not provided
	 */
	static unix(secs) {
		if (secs) {
			let t = new Time(secs*1000);
			let offset = t.timezone();
			return new Time((secs + offset)*1000);
		}

		return truncate(Date.now()/1000);
	}
}

function padNum(n) {
	return n < 10 ? `0${n}` : `${n}`;
}

const non_symbols = /[^YMmDdHhSsA]/;
const month_map = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const week_map = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const symbol_map = {
	YYYY (t) { return t.getFullYear();									},
	YY   (t) { return t.getYear();											},
	MMMM (t) { return month_map[t.getMonth()];					},
	MMM	 (t) { return this.MMMM(t).slice(0, 3); 				},
	MM   (t) { return padNum(this.M(t));								},
	M    (t) { return t.getMonth() + 1;									},
	DDDD (t) { return this['DD'](t);										},
	DDD  (t) { return this.DD(t);												},
	DD	 (t) { return padNum(this.D(t));								},
	D 	 (t) { return t.getDate();											},
	dddd (t) { return week_map[this.d(t)];							},
	ddd  (t) { return this.dddd(t).slice(0, 3); 				},
	dd	 (t) { return this.dddd(t).slice(0, 2); 				},
	d 	 (t) { return t.getDay();												},
	HH	 (t) { return padNum(this.H(t));								},
	H 	 (t) { return t.getHours();											},
	hh	 (t) { return padNum(this.h(t));								},
	h 	 (t) { return t.getHours()%12;									},
	mm 	 (t) { return padNum(this.m(t));								},
	m 	 (t) { return t.getMinutes();										},
	ss   (t) { return padNum(this.s(t));								},
	s    (t) { return t.getSeconds();										},
	A 	 (t) { return t.getHours() >= 12 ? 'PM' : 'AM'; },
};


function mapFormat(t, f) {
	let fs = f.split(non_symbols);
	let ts = fs.map(fp => {
		let tp = symbol_map[fp](t);
		return { fp, tp };
	});

	return ts.reduce((a, b) => {
		let esidx = f.indexOf(b.fp);
		let spacer = f.slice(a.length, esidx);
		return a + spacer + b.tp;
	}, '');
}
