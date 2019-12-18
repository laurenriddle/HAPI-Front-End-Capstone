import APIManager from "../../modules/APIManager";
import ExternalAPIManager from "../../modules/ExternalAPIManager";
import { Form, Button } from 'react-bootstrap';
import React, { Component } from "react"
import "./ApiSearch.css"

class APISaveForm extends Component {
    state = {
        Description: "",
        API: "",
        Link: "",
        apiKey: "",
        notes: "",
        loadingStatus: false,
        projects: [],
        projectId: ""
    };

    componentDidMount() {

        ExternalAPIManager.searchByTitle(this.props.match.params.name)
            .then(apis => {

                apis.entries.forEach(api => {
                    if (api.Link === this.props.history.location.state.url) {
                        if (api.Auth === "") {
                            this.setState({
                                Description: api.Description,
                                API: api.API,
                                Link: api.Link,
                                apiKey: "Not Required",
                                loadingStatus: false,
                            });
                        } else {
                            this.setState({
                                Description: api.Description,
                                API: api.API,
                                Link: api.Link,
                                apiKey: "Required",
                                loadingStatus: false,
                            });
                        }

                    }
                });
            });
        APIManager.get("projects")
            .then((projects) => {
                this.setState({
                    projects: projects
                })
            })
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveApi = evt => {
        evt.preventDefault()

        if (this.state.projectId !== "") {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))


            const api = {
                name: this.state.API,
                notes: this.state.notes,
                link: this.state.Link,
                userId: currentUser.id,
                description: this.state.Description,
                apiKey: this.state.apiKey,
                projectId: Number(this.state.projectId)
            }

            APIManager.post("apis", api)
                .then(() => this.props.history.push(`/project/${this.state.projectId}`))
        } else {
            alert("Please assign this API to a project.")
        }
    }

    render() {
        return (
            <>
                <div id="apiResultSaveForm">
                <h3 className="save-result-header">Save API</h3><hr />

                    <Form>
                        <Form.Group>
                            {/* <Form.Label className="save-result-form-labels">Name:</Form.Label> */}
                            <Form.Control className="save-search-result-form-input" type="text" placeholder="Enter Name" id="API" value={this.state.API} onChange={this.handleFieldChange} />
                            {/* <Form.Label className="save-result-form-labels">Link:</Form.Label> */}
                            <Form.Control className="save-search-result-form-input" type="text" id="Link" value={this.state.Link} onChange={this.handleFieldChange} />
                            {/* <Form.Label className="save-result-form-labels">Description:</Form.Label> */}
                            <Form.Control className="save-search-result-form-input" type="Description" id="Description" value={this.state.Description} onChange={this.handleFieldChange} />
                            {/* <Form.Label className="save-result-form-labels">API Key:</Form.Label> */}
                            <Form.Control className="save-search-result-form-input" type="text" id="apiKey" value={this.state.apiKey} onChange={this.handleFieldChange} />
                            {/* <Form.Label className="save-result-form-labels">Notes:</Form.Label> */}
                            <Form.Control className="save-search-result-form-input" placeholder="Enter notes here..." type="text" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />

                  
                            <select className="save-search-result-form-dropdown" id="projectId" onChange={this.handleFieldChange}>
                                <option value="">Select a Project</option>

                                {this.state.projects.map((project) => {
                                    return <option key={project.id} value={project.id} >{project.name}</option>
                                })}
                            </select>

                        </Form.Group><hr />
                        <Button
                        className="save-result-form-button"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.saveApi}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default APISaveForm