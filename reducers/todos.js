import { TODO_ACTIONS } from "../data/constants";

export default function(store =  [], action) {
	
	var { type, item } = action;
	let newStore;
	let itemIndex = 0;
	let currentItem = null;
	
	switch ( type ) {

		case TODO_ACTIONS.ADD : 
			return [...store, item];	
		break;

		case TODO_ACTIONS.ADD_ALL :
			return item;
		break;

		case TODO_ACTIONS.EDIT : 
			for (var i = 0; i < store.length; i++) {
				if (store[i].id == item.id) {
					itemIndex = i;
					break;
				} 
			};

			return store.slice(0, itemIndex).concat(item).concat(store.slice(itemIndex+1));
		break;

		case TODO_ACTIONS.DELETE :
			for (var i = 0; i < store.length; i++) {
				if (store[i].id == item.id) {
					itemIndex = i;
					break;
				} 
			};
			
			return store.slice(0, itemIndex).concat(store.slice(itemIndex+1));
		break;

		case TODO_ACTIONS.TOGGLE : 
			newStore = store.map((stItem) => {
				if (item.id == stItem.id) {
					return Object.assign({},  stItem, {completed : !stItem.completed});
				}
				
				return stItem;
			});
			
			return newStore;
		break;
		
		case TODO_ACTIONS.MARK_ALL_DONE : 
			newStore = store.map((stItem) => {
				return Object.assign({},  stItem, {completed : true});
			});
			
			return newStore;
		break;
		
		default:
			return store;
	}
}