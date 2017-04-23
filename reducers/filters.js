import { TODO_ACTIONS } from "../data/constants";

export default function(store = "SHOW_ALL", action) {
	
	const { type, filterType } = action;
	
	switch ( type ) {
		case TODO_ACTIONS.FILTER :
			return filterType;
		break;
		default:
			return store;
	}
	
}


