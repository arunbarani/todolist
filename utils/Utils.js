
/*
 * Deep copy object and freeze the properties to avoid mutate
 */
export const deepCopy = (item, freeze = false) => {
	if (Object.prototype.toString.call(item) === '[object Array]') {
		var copiedItem = [];
		
		for (var i = 0; i < item.length; i++ ) {
			copiedItem[i] = deepCopy(item[i]);
		}

		return copiedItem;
	}

	if (typeof item === 'object') {
		var copiedItem = {};

		for ( var key in item ) {
			copiedItem[key] = freeze ? Object.freeze(deepCopy(item[key])) : item[key];
		}

		return copiedItem;
	}
	
	return item;
}