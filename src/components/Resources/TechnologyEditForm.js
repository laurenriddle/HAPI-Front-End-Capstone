import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class TechnologyEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        notes: "",
        link: "",
        projectId: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTechnology = evt => {
        evt.preventDefault()
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if (this.state.name === "" && this.state.link === "" && this.state.notes === "") {
            window.alert("Please fill out the input fields.")
        } else {
            
            this.setState({ loadingStatus: true });
            const editedTechnology = {
            name: this.state.name,
            notes: this.state.notes,
            link: this.state.link,
            userId: currentUser.id,
            id: this.props.match.params.technologyId,
            projectId: this.state.projectId
        }

        APIManager.update("technologies", editedTechnology)
            .then(() => this.props.history.push(`/project/${this.state.projectId}`))
    }
    }

    componentDidMount() {
        APIManager.get(`technologies/${this.props.match.params.technologyId}`)
            .then(technology => {
                this.setState({
                    name: technology.name,
                    notes: technology.notes,
                    link: technology.link,
                    loadingStatus: false,
                    projectId: technology.projectId


                })
            });
    }

    render() {
        return (
            <>
                <div id="TechnologyEditForm">
                    <h2 className="new-project-header">Edit Technology</h2><hr />

                    <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Name" id="name" className="new-project-form-input" value={this.state.name} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            {/* <Form.Label>Link:</Form.Label> */}
                            <Form.Control type="text" id="link" placeholder="Enter Link" className="new-project-form-input" value={this.state.link} onChange={this.handleFieldChange} />
                            <Form.Control type="text" id="notes" as="textarea" className="new-project-form-input" placeholder="Enter Notes" value={this.state.notes} onChange={this.handleFieldChange} />
                        </Form.Group><hr />
                        <Button
                            className="create-project-button"

                            type="button"
                            // disabled={this.state.loadingStatus}
                            onClick={this.updateExistingTechnology}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default TechnologyEditForm