import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ProjectEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        githubUrl: "",
        description: "",
        loadingStatus: false,
        erdId: "",
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingProject = evt => {
        evt.preventDefault()
        if(this.state.name === "") {
            alert('Please enter a project name.')
        } else {
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))

        if (this.state.erdId === "") {
            const project = {
                name: this.state.name,
                githubUrl: this.state.githubUrl,
                description: this.state.description,
                userId: currentUser.id,
                id: this.props.match.params.projectId,
            }

            APIManager.update("projects", project)
                .then(() => this.props.history.push("/projects"))
        } else {

            const project = {
                name: this.state.name,
                githubUrl: this.state.githubUrl,
                description: this.state.description,
                userId: currentUser.id,
                id: this.props.match.params.projectId,
                erdId: this.state.erdId

            }

            APIManager.update("projects", project)
                .then(() => {
                    if (this.props.location.state !== undefined) {
                     this.props.history.push({ pathname: `/project/${this.props.match.params.projectId}`, state: {project: this.props.location.state.project}}) 
                } else { 
                    this.props.history.push("/projects") 
                }
                })
        }
    }
    }

    componentDidMount() {
        APIManager.get(`projects/${this.props.match.params.projectId}`)
            .then(project => {
                if (project.erdId === undefined) {
                    this.setState({
                        name: project.name,
                        description: project.description,
                        githubUrl: project.githubUrl,
                        loadingStatus: false,
                    });
                } else {
                    this.setState({
                        name: project.name,
                        description: project.description,
                        githubUrl: project.githubUrl,
                        loadingStatus: false,
                        erdId: project.erdId
                    });
                }
            });
    }

    render() {

        return (
            <>
                <div id="projectSaveForm">
        <div className="new-project-header">Edit Form</div>

                    <Form>
                    <hr /><Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" value={this.state.name} className="new-project-form-input" placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                            {/* <Form.Label>Description:</Form.Label> */}
                            <Form.Control type="text" as="textarea" rows="5"  placeholder="Enter Description"  className="new-project-form-input" id="description" value={this.state.description} onChange={this.handleFieldChange} />
                            {/* <Form.Label>GitHub Link:</Form.Label> */}
                            <Form.Control type="text" id="githubUrl" placeholder="Enter GitHub URL"  className="new-project-form-input" value={this.state.githubUrl} onChange={this.handleFieldChange} />
                        </Form.Group><hr />
                        <Button
                            className="create-project-button"

                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingProject}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default ProjectEditForm