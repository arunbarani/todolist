import React from "react";
import ReactDOM from "react-dom";
import { Glyphicon, Button } from "react-bootstrap";
import TodoItemTools from "./TodoItemTools";
import { TODO_UI_LABEL } from "../data/constants";
import ModalDialog from "./ModalDialog";

class TodoItem extends React.Component {
	constructor() {
		super();

		this.state = {
			showTools: false,
			showModal: false,
			editMode: false,
			showConfirm: false,
			todoValue: ''
		}

		this.mouseEnter = false;
		this.todoTextEdit = null;
		this.confirmHandler = null;
	}

	/*
	 * Show todo tools [iew|Edit|Delete] icons
	 */
	showTodoTools(event) {
		this.mouseEnter = true;

		setTimeout((function () {
			if (this.mouseEnter == true) {
				this.mouseEnter = false;
				this.setState({
					showTools: true
				});
			}
		}).bind(this), 300);
	}

	/*
	 * Hide todo tools [iew|Edit|Delete] icons
	 */
	hideTodoTools(event) {
		this.mouseEnter = false;
		this.setState({
			showTools: false
		});
	}

	/*
	 * Hide modal dialog window
	 */
	hideModal() {
		this.setState({
			editMode: false,
			showModal: false,
			showConfirm: false
		});
	}

	/*
	 * Show modal dialog window
	 */
	showModal() {
		this.setState({
			showModal: true
		});
	}

	/*
	 * Marks the currently opned todos as Done and close the modal window
	 */
	markDoneAndClose(id) {
		this.props.toggleTodo(id);
		this.setState({
			showModal: false
		});
	}


	/*
	 * Get content to show in modal window.
	 */
	getModalContent() {
		let modalContent = this.props.todo.text;

		if (this.state.editMode) {
			modalContent = < input type = "text"
			ref = {
				(input) => this.todoTextEdit = input
			}
			style = {
				{
					width: '100%',
					height: '100%',
					color: 'black'
				}
			}
			defaultValue = {
				this.props.todo.text
			}
			/>
		} else if (this.state.showConfirm == true) {
			modalContent = TODO_UI_LABEL.CONFIRM_DELETE_MESSAGE;
		}

		return modalContent;
	}

	/*
	 * Get button to show in modal window.
	 */
	getModalButton() {
		let modalButton = this.getDoneButton();

		if (this.state.editMode == true) {
			modalButton = <Button bsStyle="primary" onClick={this.saveValue.bind(this, this.props.todo.id)}>{TODO_UI_LABEL.SAVE}</Button>
		} else if ( this.state.showConfirm == true ) {
			modalButton = <Button bsStyle="primary" onClick={this.confirmHandler}>{TODO_UI_LABEL.OK}</Button>
		}
		return  modalButton;
	}

	/*
	 * Add 'Mark As Done' button only when the todo is in active state
	 */
	getDoneButton() {
		let doneButton = null;
		
		if (this.props.todo.completed == false)
			doneButton = <Button bsStyle="primary" onClick={this.markDoneAndClose.bind(this, this.props.todo.id)}>{TODO_UI_LABEL.MARK_AS_DONE}</Button>

		return doneButton;
	}

	/*
	 * Form todo item tools.
	 */
	getTodoItemTools() {
		 return this.state.showTools ? <TodoItemTools showEditBox={this.showEditBox.bind(this)} showModal={this.showModal.bind(this)} removeTodo={this.removeTodo.bind(this, this.props.todo.id)}/> : null
	}


	/*
	 * Remove todo when x button clicked on todo item tools
	 */
	removeTodo(id) {
		this.confirmDelete(function () {
			this.setState({
				showConfirm: false,
				showModal: false
			});
			this.props.removeTodo(id);
		})

	}

	/*
	 * Get confirmation before delete todo.
	 */
	confirmDelete(callback) {
		this.confirmHandler = callback.bind(this);
		this.setState({
			showConfirm: true,
			showModal: true
		});
	}

	/*
	 * Show the modal window to edit the todo
	 */
	showEditBox() {
		this.setState({
			editMode: true,
			showModal: true
		});
	}

	/*
	 * Save the edited todo
	 */
	saveValue(id) {
		let item = {};

		Object.assign(item, this.props.todo);
		item.text = this.todoTextEdit.value;

		this.props.editTodo(item);
		this.setState({
			editMode: false,
			showModal: false
		});
	}


    render() {
		let color = this.props.todo.completed ? '#6d9e2d' : '#ffffff';		
		let opacity = this.props.todo.completed ? 1 : 0.8;
		let tools = this.getTodoItemTools();
		let modalContent = this.getModalContent();
		let button = this.getModalButton();
		let modalTitle = this.state.editMode ? TODO_UI_LABEL.MODAL_EDIT : this.state.showConfirm ? TODO_UI_LABEL.MODAL_DELETE : TODO_UI_LABEL.MODAL_VIEW;
		
		return (
			<div className="todoItemContainer" 
				onMouseEnter={this.showTodoTools.bind(this)}
				onMouseLeave={this.hideTodoTools.bind(this)}
				onClick={this.showTodoTools.bind(this)}>
				<span>
					<Glyphicon className="todoItemToolsIcon" 
							style={{color:color, opacity : opacity}} 
							glyph="ok-sign" 
							onClick={this.props.toggleTodo.bind(null, this.props.todo.id)}/>
				</span> 
				<span className="todoText">{this.props.todo.text}</span> 
				{tools}
				
				<ModalDialog showModal={this.state.showModal} onHideModal={this.hideModal.bind(this)}
							 title={modalTitle} modalContent={modalContent} button={button} />
			</div> )
	}
}
                
export default TodoItem;