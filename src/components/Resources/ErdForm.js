import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ErdForm extends Component {
    state = {
        name: "",
        link: "",
        notes: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewErd = evt => {
        if(this.state.erd !== undefined){
            evt.preventDefault();
                this.setState({ loadingStatus: true });
                const currentUser = JSON.parse(localStorage.getItem("credentials"))
                const erd = {
                    name: this.state.name,
                    link: this.state.link,
                    notes: this.state.notes,
                    userId: currentUser.id,
                    projectId: this.props.location.state.project
                }
                APIManager.post("erds", erd)
                    .then(() => this.props.history.push(`/project/${this.props.location.state.project}`))

        } else {
            alert("This project already has an ERD. There can only be one ERD for each project. Please delete the existing ERD before you create a new one.")
        this.props.history.push(`/project/${this.props.location.state.project}`)
        }
    }
    render() {
        return (
            <>
                <div id="newErdForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="link" onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Notes" id="notes" onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                        className="newEventBtn"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewErd}
                        >Create Erd</Button>
                    </Form>
                </div>
            </>
        )
    }
}
export default ErdForm