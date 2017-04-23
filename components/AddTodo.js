import React from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions/todoActions";
import { Glyphicon } from "react-bootstrap";
import { addTodoService } from "../service/todoService";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

@connect( function(store){
	return {}
})

class AddTodo extends React.Component {
	constructor() {
		super();
		this.state = {
			todoValue: '',
			showTextInput: false,
			showHeaderLabel: true
		}
	}

	/*
	 * Preserve the current todo value in a state value
	 */
	textChangeHandler(event) {
		this.setState({
			todoValue: event.target.value
		});
	}

	/*
	 * Add new todo on Enter key down
	 */
	onKeyDownHandler(event) {
		if (event.keyCode == 13) {
			this.addTodoItem();
		}
	}

	/*
	 * Add new todo item 
	 */
	addTodoItem() {
		let value = this.state.todoValue;
		if (value.length > 0) {
			this.setState({
				id: this.state.id + 1
			});
			this.props.dispatch(
				function (dispatch) {
					addTodoService(value)
						.then(data => dispatch(addTodo(data.id, data.text)),
							error => console.log(error));
				});

			this.setState({
				todoValue: ''
			});
			this.refs['txtTodoText'].value = '';
		}
	}

	/*
	 * Change the state to showTextInput.
	 */
	showAddTodoTools() {
		this.setState({
			showTextInput: !this.state.showTextInput
		});
	}


	/*
	 * Show / Hide the 'What Needs To Be Done?' label based on the text input visible
	 */
	componentWillUpdate(nextProps, nextState) {
		if (this.state.showTextInput == false &&
			nextState.showTextInput == true) {
			if (this.state.showHeaderLabel) {
				setTimeout((function () {
					this.setState({
						showHeaderLabel: false
					});
				}).bind(this), 250);
			}
		} else if (this.state.showTextInput == true &&
			nextState.showTextInput == false) {
			this.refs['txtTodoText'].value = "";
			this.setState({
				showHeaderLabel: true
			});
			this.setState({
				todoValue: ""
			});
		}
	}

	/*
	 * Focus on text input field when state is on showTextInput
	 */
	componentDidUpdate(nextProps, nextState) {
		if (this.state.showTextInput == true) {
			this.refs['txtTodoText'].focus();
		}
	}

	render() {
		
			let txtInput = null;
			let zIndex = this.state.showHeaderLabel ? 1 : 0;
			let placeholder = this.state.showHeaderLabel ? "" : "What Needs To Be Done?";
			let addCancelTodoButton = <div className="showTodoButton"><Glyphicon glyph="plus-sign" onClick={this.showAddTodoTools.bind(this)} /></div> 
            
            let titleBar =  <div style={{zIndex:zIndex}} className="newItemLabel"> {"What Needs To Be Done?"} </div>
			if (this.state.showTextInput) {
                txtInput = (<div className="addTodoTools">
								<div className="addTodoTextParent">
									<input placeholder={placeholder} className="addTodoText" ref={'txtTodoText'} onChange={this.textChangeHandler.bind(this)} onKeyDown={this.onKeyDownHandler.bind(this)} />
								</div>
								<div className="addTodoButton">
									<Glyphicon glyph="ok-sign" onClick={this.addTodoItem.bind(this)} />
								</div>
							</div>)
                    
                addCancelTodoButton = (<div className="cancelTodoButton">
									  	  <Glyphicon glyph="remove-sign" onClick={this.showAddTodoTools.bind(this)} />
									   </div>)
				
            } else if (this.refs['txtTodoText']) {
				this.refs['txtTodoText'].placeholder = "";
			}
				
		
		return (
			<div className="addTodoContainer">
				<span className="titleContainer">
                    {titleBar}           
                </span>
				<ReactCSSTransitionGroup
					 className="addTodoTextContainer"
                     transitionName="example"
					 transitionEnterTimeout={200}
					 transitionLeaveTimeout={200}>
                          { txtInput }            
                    </ReactCSSTransitionGroup>
					{addCancelTodoButton}
			</div>
		)
	}
}

export default AddTodo;