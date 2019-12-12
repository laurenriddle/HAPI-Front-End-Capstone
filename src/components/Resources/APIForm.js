import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ApiForm extends Component {
    state = {
        notes: "",
        link: "",
        description: "",
        apiKey: "",
        name: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewApi = evt => {
        evt.preventDefault();
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            
                const Api = {
                    name: this.state.name,
                    notes: this.state.notes,
                    link: this.state.link,
                    userId: currentUser.id,
                    description: this.state.description,
                    apiKey: this.state.apiKey,
                }
            
            APIManager.post("apis", Api)
                .then(() => this.props.history.push("/Resources"))
        
    }
    render() {
        return (

            <>
            <div id="apiSaveForm">
                <Form>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                        <Form.Label>Link:</Form.Label>
                        <Form.Control type="text" id="link" onChange={this.handleFieldChange} />
                        <Form.Label>Description:</Form.Label>
                        <Form.Control type="text" id="description" onChange={this.handleFieldChange} />
                        <Form.Label>API Key:</Form.Label>
                        <Form.Control type="text" id="apiKey" onChange={this.handleFieldChange} />
                        <Form.Label>Notes:</Form.Label>
                        <Form.Control type="text" id="notes" onChange={this.handleFieldChange} />
                    </Form.Group>
                    <Button
                        type="button"
                        disabled={this.state.loadingStatus}
                        onClick={this.constructNewApi}
                    >Save</Button>
                </Form>
            </div>

        </>
        )
    }
}
export default ApiForm