import APIManager from "../../modules/APIManager";
import ExternalAPIManager from "../../modules/ExternalAPIManager";
import { Form, Button } from 'react-bootstrap';
import React, { Component } from "react"

class APISaveForm extends Component {
    //set the initial state
    state = {
        Description: "",
        API: "",
        Link: "",
        apiKey: "",
        notes: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    saveApi = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))


        const api = {
            name: this.state.API,
            notes: this.state.notes,
            link: this.state.Link,
            userId: currentUser.id,
            description: this.state.Description,
            apiKey: this.state.apiKey
        }

        APIManager.post("apis", api)
            .then(() => this.props.history.push("/Resources"))
    }

    componentDidMount() {
        // console.log("this.props.api", this.props.match.params.name)
        // console.log("this.props LINK", this.props.history.location.state.url)
        // console.log("passed prop", this.props.location.state.Link)

        // console.log("The comp dod moiunt")
        ExternalAPIManager.searchByTitle(this.props.match.params.name)
            .then(apis => {
                // console.log("response", apis)
                // if (Object.keys(erd).length === 0) {
                //     this.props.history.push("/events")
                //     window.alert('The event you were trying to access does not exists.')
                // } else {
                apis.entries.forEach(api => {
                    if (api.Link === this.props.history.location.state.url)
                    {
                        this.setState({
                            Description: api.Description,
                            API: api.API,
                            Link: api.Link,
                            loadingStatus: false,
                        });

                    }
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
                            <Form.Control type="text" placeholder="Enter Name" id="API" value={this.state.API} onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="Link" value={this.state.Link} onChange={this.handleFieldChange} />
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="Description" id="Description" value={this.state.Description} onChange={this.handleFieldChange} />
                            <Form.Label>API Key:</Form.Label>
                            <Form.Control type="text" id="apiKey" value={this.state.apiKey} onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
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