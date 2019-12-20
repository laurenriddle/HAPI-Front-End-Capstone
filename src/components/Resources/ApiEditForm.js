import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ApiEditForm extends Component {
    //set the initial state
    state = {
        notes: "",
        link: "",
        description: "",
        apiKey: "",
        name: "",
        projectId: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingApi = evt => {
        evt.preventDefault()
        if (this.state.name === "") {
            alert('Please enter a name.')
        } else {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))


            const editedApi = {
                name: this.state.name,
                notes: this.state.notes,
                link: this.state.link,
                userId: currentUser.id,
                description: this.state.description,
                apiKey: this.state.apiKey,
                id: this.props.match.params.apiId,
                projectId: this.state.projectId
            }

            APIManager.update("apis", editedApi)
                .then(() => this.props.history.push(`/project/${this.state.projectId}`))
        }
    }

    componentDidMount() {
        APIManager.get(`apis/${this.props.match.params.apiId}`)
            .then(api => {

                this.setState({
                    name: api.name,
                    notes: api.notes,
                    link: api.link,
                    apiKey: api.apiKey,
                    description: api.description,
                    loadingStatus: false,
                    projectId: api.projectId
                });
            });
    }

    render() {
        return (
            <>
                <div id="apiSaveForm">
                    <h2 className="new-project-header">Edit API</h2><hr />
                    <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" className="new-project-form-input" placeholder="Enter Name" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Link:</Form.Label> */}
                            <Form.Control type="text" className="new-project-form-input" placeholder="Enter Link" id="link" value={this.state.link} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Description:</Form.Label> */}
                            <Form.Control type="Description" as="textarea" rows="2" placeholder="Enter Description" className="new-project-form-input" id="description" value={this.state.description} onChange={this.handleFieldChange} />
                            {/* <Form.Label>API Key:</Form.Label> */}
                            <Form.Control type="text" className="new-project-form-input" placeholder="Enter API Key" id="apiKey" value={this.state.apiKey} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            <Form.Control type="text" as="textarea" rows="2" placeholder="Enter Notes" className="new-project-form-input" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                        </Form.Group><hr />
                        <Button variant="light"

                            className="create-project-button"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingApi}
                        >Save</Button>
                    </Form>
                </div>

            </>
        );
    }
}

export default ApiEditForm