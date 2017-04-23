import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "../../components/TodoApp";
import todoReducers from "../../reducers/mainReducer";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { addTodo, removeTodo, toggleTodo, filterTodo } from "../../actions/todoActions";


let store = createStore( todoReducers, applyMiddleware(thunk) );

store.subscribe(function() {
	console.log(store.getState());
});

ReactDOM.render(
	<Provider store={store}>
		<TodoApp />
	</Provider>, 
	document.getElementById("app")
);