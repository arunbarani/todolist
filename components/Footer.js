import React from "react";
import { Glyphicon } from "react-bootstrap";
import { TODO_FILTERS } from "../data/constants";
import { markAllDoneTodo } from "../actions/todoActions"
import { connect } from "react-redux";
import { markAllAsDoneService } from "../service/todoService";

@connect(function (state) {
	return {
		todos : state.todos,
		filter : state.filter
	}
})

class Footer extends React.Component {

    /*
    * Mark all todos as Done.
    */
    markAllAsDone() {
        this.props.dispatch(function (dispatch) {
            markAllAsDoneService().then(
                data => dispatch(markAllDoneTodo()),
                error => console.log(error))
        });
    }

    /*
    * Get remaining todos count to show in footer.
    */
    getRemainigTodos() {
        let remainingTodos = 0;

        for (let i = 0; i < this.props.todos.length; i++) {
            if (this.props.todos[i].completed == false)
                remainingTodos++;
        }
        return remainingTodos;
    }


render(){
    let showMarkAsDonebutton = this.props.filter == TODO_FILTERS.SHOW_COMPLETED.type ?  "hidden" : "";
    let remainingTodos = this.getRemainigTodos();
    

    return (

        <div className="footer">

                <a style={{visibility:showMarkAsDonebutton}} className="markAllAsDone"  onClick={this.markAllAsDone.bind(this)}>Mark All As Done</a>
                <span className="remainingTasksText"><span className="remainingTasks">{remainingTodos }</span> items remaining</span>
                
        </div>

    )
}

}


export default Footer;