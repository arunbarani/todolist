import React from "react";
import { Modal, Button } from "react-bootstrap";


class ModalDialog extends React.Component{


    render(){
        return (<Modal show={this.props.showModal} onHide={this.props.onHideModal} style={{color:'white'}} >
					<Modal.Header closeButton style={{backgroundColor:'black'}}>
						<Modal.Title>{this.props.title}</Modal.Title>
					</Modal.Header>
					<Modal.Body style={{backgroundColor:'black'}}>
						{ this.props.modalContent }
					</Modal.Body>
					<Modal.Footer style={{backgroundColor:'black'}}>
						{this.props.button}
						<Button onClick={this.props.onHideModal}>Close</Button>
					</Modal.Footer>
				</Modal>);
    }


}

export default ModalDialog;