import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';
import "./Projects.css"


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
        if(this.state.name === "") {
            alert('Please enter a project name.')
        } else {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            
                const project = {
                    name: this.state.name,
                    githubUrl: this.state.githubUrl,
                    description: this.state.description,
                    userId: currentUser.id,
                }
            
            APIManager.post("projects", project)
                .then(() => this.props.history.push("/projects"))
            }
    }
    render() {
        return (

            <>
            <div id="projectSaveForm">
                <Form>
                    <div className="new-project-header">New Project</div><hr />
                    <Form.Group>
                        <Form.Control type="text" className="new-project-form-input" placeholder="Project Name" id="name" onChange={this.handleFieldChange} />
                        <Form.Control type="text" as="textarea" rows="3" id="description" className="new-project-form-input"  placeholder="Project Description" onChange={this.handleFieldChange} />
                        <Form.Control type="text" id="githubUrl" className="new-project-form-input"   placeholder="Project GitHub URL" onChange={this.handleFieldChange} />
                    </Form.Group><hr />
                    <Button
                        type="button"
                        variant="light"
                        className="create-project-button"
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