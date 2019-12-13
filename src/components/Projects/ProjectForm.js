import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ProjectForm extends Component {
    state = {
        name: "",
        githubUrl: "",
        description: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewProject = evt => {
        evt.preventDefault();
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            
                const project = {
                    name: this.state.name,
                    githubUrl: this.state.githubUrl,
                    description: this.state.description,
                    userId: currentUser.id,
                    erdId: ""
                }
            
            APIManager.post("projects", project)
                .then(() => this.props.history.push("/projects"))
        
    }
    render() {
        return (

            <>
            <div id="projectSaveForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" id="description" onChange={this.handleFieldChange} />
                        <Form.Label>GitHub Link:</Form.Label>
                        <Form.Control type="text" id="githubUrl" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewProject}
                    >Save</Button>
                </Form>
            </div>

        </>
        )
    }
}
export default ProjectForm