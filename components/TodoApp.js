import React from "react";
import ReactDOM from "react-dom";
import TodoFitler from "./TodoFilter";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Header from "./Header";
import Footer from "./Footer";


class TodoApp extends React.Component {
    
    render() {
        return (
		<div style={{width:100 + "%", height:'100%', position : 'relative'}}>
			<Header />
			<AddTodo />
			<TodoFitler/>
			<TodoList />
			<Footer />
		</div>
    )
    }
};


export default TodoApp;