import {
	TODO_ACTIONS
} from "../data/constants";

export const addTodo = (id, text) => {

	return {
		type: TODO_ACTIONS.ADD,
		item: {
			id,
			text,
			completed: false
		}
	}
}

export const addAllTodo = (allTodo) => {

	return {
		type: TODO_ACTIONS.ADD_ALL,
		item: allTodo
	}
}

export const editTodo = (item) => {

	return {
		type: TODO_ACTIONS.EDIT,
		item
	}
}

export const toggleTodo = (id) => {

	return {
		type: TODO_ACTIONS.TOGGLE,
		item: {
			id
		}
	}
}

export const removeTodo = (id) => {

	return {
		type: TODO_ACTIONS.DELETE,
		item: {
			id
		}
	}
}


export const filterTodo = (filterType) => {

	return {
		type: TODO_ACTIONS.FILTER,
		filterType
	}
}

export const markAllDoneTodo = (filterType) => {

	return {
		type: TODO_ACTIONS.MARK_ALL_DONE
	}

}