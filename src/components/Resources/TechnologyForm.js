import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class TechnologyForm extends Component {
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
    constructNewTechnology = evt => {
        evt.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if (this.state.name === "") {
            window.alert("Please enter a name.")
        } else {
            this.setState({ loadingStatus: true });
            const technology = {
                name: this.state.name,
                link: this.state.link,
                notes: this.state.notes,
                userId: currentUser.id,
                projectId: this.props.location.state.project
            }
            APIManager.post("technologies", technology)
                .then(() => this.props.history.push(`/project/${this.props.location.state.project}`))
        }
    }
    render() {
        return (
            <>
                <div id="newTechnologyForm">
                    <h2 className="new-project-header">New Technology</h2><hr />

                    <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Name" id="name" className="new-project-form-input" onChange={this.handleFieldChange} />
                            {/* <Form.Label>Link:</Form.Label> */}
                            <Form.Control type="text" id="link" className="new-project-form-input" placeholder="Enter Link" onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Notes" as="textarea" id="notes" className="new-project-form-input" onChange={this.handleFieldChange} />
                        </Form.Group><hr />
                        <Button variant="light"

                            className="create-project-button"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewTechnology}
                        >Create Technology</Button>
                    </Form>
                </div>
            </>
        )
    }
}
export default TechnologyForm