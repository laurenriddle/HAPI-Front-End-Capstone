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
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingApi = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))


        const editedApi = {
            name: this.state.name,
            notes: this.state.notes,
            link: this.state.link,
            userId: currentUser.id,
            description: this.state.description,
            apiKey: this.state.apiKey,
            id: this.props.match.params.apiId
        }

        APIManager.update("apis", editedApi)
            .then(() => this.props.history.push("/Resources"))
    }

    componentDidMount() {
        APIManager.get(`apis/${this.props.match.params.apiId}`)
            .then(api => {
                // if (Object.keys(api).length === 0) {
                //     this.props.history.push("/events")
                //     window.alert('The event you were trying to access does not exists.')
                // } else {
                this.setState({
                    name: api.name,
                    notes: api.notes,
                    link: api.link,
                    apiKey: api.apiKey,
                    description: api.description,
                    loadingStatus: false,
                });
                // }
            });
    }

    render() {
        return (
            <>
                <div id="apiSaveForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="link" value={this.state.link} onChange={this.handleFieldChange} />
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="Description" id="description" value={this.state.description} onChange={this.handleFieldChange} />
                            <Form.Label>API Key:</Form.Label>
                            <Form.Control type="text" id="apiKey" value={this.state.apiKey} onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
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