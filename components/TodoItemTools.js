import React from "react";
import { Glyphicon } from "react-bootstrap";


class TodoItemTools extends React.Component {


    render(){
        return (<div style={{position:'absolute',right : "-25px",top : 25,bottom : 0,width : '100px', color:'#5bc0de'}}>
                 <span style={{position:'absolute', top:'17px'}}>
					<Glyphicon className="todoItemToolsIcon" onClick={this.props.showModal} glyph="eye-open" style={{fontSize:'18px', paddingRight:'6px', opacity:'1', zIndex:1000}} /> 
                    <Glyphicon className="todoItemToolsIcon" onClick={this.props.showEditBox} glyph="edit"  style={{fontSize:'17px', paddingRight:'5px', opacity:'1'}}  />
                    <Glyphicon className="todoItemToolsIcon" onClick={this.props.removeTodo} glyph="remove"   style={{fontSize:'18px', opacity:'1', color:'red'}} />
				</span> 
            </div>
        )

    }
}

export default TodoItemTools;