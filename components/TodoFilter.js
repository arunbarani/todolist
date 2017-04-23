import { connect } from "react-redux";
import React from "react";
import { filterTodo } from "../actions/todoActions";
import { Button, ButtonGroup } from "react-bootstrap";
import { TODO_UI_LABEL } from "../data/constants";


@connect(function (state) {
	return {
		todos : state.todos,
		filter : state.filter
	}
})

class TodoFitler extends React.Component {
	
	onFilterClick(type) {
		this.props.dispatch(filterTodo(type));
	}
	
	render() {
		
		let FiltersData = TODO_UI_LABEL.FILTERS;		
		let buttonPer = 100 / FiltersData.length;
		
		
		return ( <div className="todoFilterContainer">
					<ButtonGroup style={{width : "100%", padding: '0px 5px'}} justified>
					{
						FiltersData.map((item) => {
							
						let className = this.props.filter == item.type ? "selectedTab" : "tab";
						
						return <Button className={className}  style={{width : buttonPer + '%' }} key={item.label} onClick={this.onFilterClick.bind(this, item.type)}>{item.label}</Button>
						})
					}
					</ButtonGroup>
				</div> )
	}
}

export default TodoFitler