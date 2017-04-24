import * as TodoActions from "../actions/todoActions";
import { TODO_ACTIONS } from "../data/constants"

const todos = [{	id : 1,
						text : "One",
						completed : false
					}];


describe("todo reducer", () => {
	it("Test add all todo action", function(){
		let action = {
			type : TODO_ACTIONS.ADD_ALL,
				item : todos
		};

		expect(TodoActions.addAllTodo(todos)).toEqual(action);
	});


	it("Test add todo action", function(){
		let action = {
			type : TODO_ACTIONS.ADD,
				item : {	id : 1,
							text : "One",
							completed : false
						}	
		};

		expect(TodoActions.addTodo(1, "One")).toEqual(action);
	});


	it("Test toggle todo action", function(){
		let action = {
			type : TODO_ACTIONS.TOGGLE,
				item : { id : 1 }	
		};

		expect(TodoActions.toggleTodo(1)).toEqual(action);
	});

	it("Test edit todo action", function(){
		let item = {	id : 1,
							text : "One",
							completed : false
						};

		let action = {
			type : TODO_ACTIONS.EDIT,
				item
		};

		expect(TodoActions.editTodo(item)).toEqual(action);
	});


	it("Test delete todo action", function(){
		let action = {
			type : TODO_ACTIONS.DELETE,
				item : {id : 1}
		};

		expect(TodoActions.removeTodo(1)).toEqual(action);
	});


});
