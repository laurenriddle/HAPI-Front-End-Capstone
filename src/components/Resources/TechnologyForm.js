import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class TechnologyForm extends Component {
    state = {
        name: "",
        link: "",
        notes: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewTechnology = evt => {
        evt.preventDefault();
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            const technology = {
                name: this.state.name,
                link: this.state.link,
                notes: this.state.notes,
                userId: currentUser.id
            }
            APIManager.post("technologies", technology)
                .then(() => this.props.history.push("/Resources"))
        
    }
    render() {
        return (
            <>
                <div id="newTechnologyForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="name" onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="link" onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Notes" id="notes" onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                        className="newEventBtn"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewTechnology}
                        >Create Technology</Button>
                    </Form>
                </div>
            </>
        )
    }
}
export default TechnologyForm