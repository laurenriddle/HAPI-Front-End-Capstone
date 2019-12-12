import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class TechnologyEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        notes: "",
        link: "",
        loadingStatus: false,
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTechnology = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))


        const editedTechnology = {
            name: this.state.name,
            notes: this.state.notes,
            link: this.state.link,
            userId: currentUser.id,
            id: this.props.match.params.technologyId
        }

        APIManager.update("technologies", editedTechnology)
            .then(() => this.props.history.push("/Resources"))
    }

    componentDidMount() {
        APIManager.get(`technologies/${this.props.match.params.technologyId}`)
            .then(technology => {
                this.setState({
                    name: technology.name,
                    notes: technology.notes,
                    link: technology.link,
                    loadingStatus: false,

                })
            });
    }

    render() {
        return (
            <>
                <div id="TechnologyEditForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="link" value={this.state.link} onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingTechnology}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default TechnologyEditForm