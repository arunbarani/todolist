import * as TodoActions from "../actions/todoActions";
import todoReducer from "../reducers/todos";
import { TODO_ACTIONS, TODO_FILTERS } from "../config/constants";
import { deepCopy } from "../utils/Utils"


const todos = [{	id : 1,
						text : "One",
						completed : false
					}, {	id : 2,
						text : "Two",
						completed : false
					}, {	id : 3,
						text : "Three",
						completed : true
					}, {	id : 4,
						text : "Four",
						completed : true
					}];


describe("todo reducer", () => {

	let storeBefore = undefined;
	let storeAfter = [];
	let action = TodoActions.addAllTodo([]);

	beforeEach(() => {
		// Copy all the storeAfter object to storeBefore and freez the objects.
		storeBefore = deepCopy(storeAfter, true);
	})

	it("should return empty store", () => {
		console.log("in empty");
		 expect(todoReducer(undefined, action)).toEqual(storeAfter);
	});
	

	it("should add array of todos", () => {
		storeAfter = [...todos];
		action = TodoActions.addAllTodo(todos);

    	expect(todoReducer(storeBefore, action)).toEqual(storeAfter);
	})

	it("should add one todo", () => {
		let newItem = { id : 5,
						text : "Five",
						completed : false }

		storeAfter = [...todos, newItem];

		action = TodoActions.addTodo(newItem.id, newItem.text);

    	expect(todoReducer(storeBefore, action)).toEqual(storeAfter);
	});


	it("should toggle todo status", () => {
		let itemIndex = storeAfter.length - 1;
		let toggleId;

		storeAfter[itemIndex].completed = !storeAfter[itemIndex].completed;
		toggleId = storeAfter[itemIndex].id;
		action = TodoActions.toggleTodo(toggleId);

    	expect(todoReducer(storeBefore, action)).toEqual(storeAfter);
	});

	it("should remove todo", () => {
		let itemIndex = 2;
		let removeId;

		removeId = storeAfter[itemIndex].id;
		storeAfter.splice(itemIndex, 1);
		action = TodoActions.removeTodo(removeId);

    	expect(todoReducer(storeBefore, action)).toEqual(storeAfter);
	});


	it("should edit todo", () => {
		let itemIndex = 2;

		storeAfter[itemIndex].text = "This is edited text";
		action = TodoActions.editTodo(storeAfter[itemIndex]);

    	expect(todoReducer(storeBefore, action)).toEqual(storeAfter);
	});
})