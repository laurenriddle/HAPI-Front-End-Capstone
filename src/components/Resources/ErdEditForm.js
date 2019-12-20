import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';


class ErdEditForm extends Component {
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

    updateExistingErd = evt => {
        evt.preventDefault()
        if(this.state.name === "") {
            alert('Please enter a name.')
        } else {
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))


        const editedErd = {
            name: this.state.name,
            notes: this.state.notes,
            link: this.state.link,
            userId: currentUser.id,
            id: this.props.match.params.erdId,
        }

        APIManager.update("erds", editedErd)
            .then(() => this.props.history.push(`/project/${this.props.location.state.project}`))
    }
    }

    componentDidMount() {
        APIManager.get(`erds/${this.props.match.params.erdId}`)
            .then(erd => {
                this.setState({
                    name: erd.name,
                    notes: erd.notes,
                    link: erd.link,
                    loadingStatus: false,

                })
            });

    }

    render() {
        return (
            <>
                <div id="erdEditForm">
                <h2 className="new-project-header">Edit ERD</h2>

                   <hr/> <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" className="new-project-form-input" placeholder="Enter Name" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            <Form.Control type="text" className="new-project-form-input"  placeholder="Enter Link" id="link" value={this.state.link} onChange={this.handleFieldChange} />
                            <Form.Control type="text" className="new-project-form-input"  placeholder="Enter Notes" as="textarea" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Link:</Form.Label> */}
                        </Form.Group><hr />
                        <Button
                            className="create-project-button"
                            variant="light"

                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingErd}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default ErdEditForm