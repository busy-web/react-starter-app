/**
 * @module Service
 *
 */
import StoreService from '@busyweb/data/store';

class Store extends StoreService {
	name = "Store";

	constructor() {
		super();

		this.test = 2;
	}
}

export default Store;
