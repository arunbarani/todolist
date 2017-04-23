import React from "react";
import ReactDOM from "react-dom";
import TodoItem from "../components/TodoItem";
import { connect } from "react-redux";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { toggleTodo, removeTodo, editTodo, addAllTodo } from "../actions/todoActions";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { getTodoListService, toggleTodoService, editTodoService, deleteTodoService } from "../service/todoService";
import { TODO_FILTERS } from "../data/constants";


@connect(function (state) {
	return {
		todos : state.todos,
		filter : state.filter
	}	
})

class TodoList extends React.Component {

	/*
	* Get the todo list when component mount
	*/
	componentDidMount() {
		this.props.dispatch(
			function(dispatch) {
				getTodoListService().then(
					data => dispatch(addAllTodo(data.todos)),
					error => console.log(error))
				});
	}
    

	/*
	 * Filter the todos based on filter type [ALL | ACTIVE | COMPLETED]
	 */
	getFilterTodo() {
		switch (this.props.filter){
			case TODO_FILTERS.SHOW_COMPLETED.type :
				return this.props.todos.filter((item) => item.completed == true);
			break;
			case TODO_FILTERS.SHOW_ACTIVE.type :
				return this.props.todos.filter((item) => item.completed == false);
			break;
			default:
				return this.props.todos;
		}		
	}

	/*
	 * Toggle todo
	 */
	toggleTodo(id) {
		this.props.dispatch(
			function(dispatch) {
				toggleTodoService(id)
				.then(data => dispatch(toggleTodo(data.id, data.completed)),
					  error => console.log(error));
			});
	}

	/*
	 * Remove todo
	 */
	removeTodo(id) {
		this.props.dispatch(
			function(dispatch) {
				deleteTodoService(id)
				.then(data => dispatch(removeTodo(data.id)),
					  error => console.log(error));
			});
	}

	/*
	 * Edit todo
	 */
	editTodo(item) {
		this.props.dispatch(
			function(dispatch) {
				editTodoService(item)
				.then(data => dispatch(editTodo(data)),
					  error => console.log(error));
			});
	}

	/*
	 * Form the todo item list from filtered todo
	 */
	formTodoList(){
		let filteredTodo = this.getFilterTodo();

		return filteredTodo.map(item => {
							return <ListGroupItem 
								className="listGrpItem"
								key={item.id}> 
								<TodoItem toggleTodo={this.toggleTodo.bind(this)} 
								removeTodo={this.removeTodo.bind(this)} 
								editTodo={this.editTodo.bind(this)}
								todo={item}/>
							</ListGroupItem>
							});
	}
	
    render() {		
		let todoItems = this.formTodoList();
		
		return (<div className="todoListContainer">
					<ListGroup style={{marginBottom:"0px"}}>
						<ReactCSSTransitionGroup
                      		transitionName="example"
                      		transitionEnterTimeout={300}
                     		 transitionLeaveTimeout={300}>
                         		{todoItems}        
                    	</ReactCSSTransitionGroup>
					</ListGroup>
				</div>)
		
    }
}
                       
export default TodoList
