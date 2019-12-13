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
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))

        const project = {
            name: this.state.name,
            githubUrl: this.state.githubUrl,
            description: this.state.description,
            userId: currentUser.id,
            id: this.props.match.params.projectId,
            erdId: this.state.erdId

        }

        APIManager.update("projects", project)
            .then(() => this.props.history.push("/projects"))
    }

    componentDidMount() {
        APIManager.get(`projects/${this.props.match.params.projectId}`)
            .then(project => {
                this.setState({
                    name: project.name,
                    description: project.description,
                    githubUrl: project.githubUrl,
                    loadingStatus: false,
                    erdId: project.erdId
                });
            });
    }

    render() {
        return (
            <>
                <div id="projectSaveForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" value={this.state.name} placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" id="description" value={this.state.description} onChange={this.handleFieldChange} />
                            <Form.Label>GitHub Link:</Form.Label>
                            <Form.Control type="text" id="githubUrl" value={this.state.githubUrl} onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
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