import React, { Component } from 'react'
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';
import { cloudName, uploadPreset } from '../../modules/Credentials';

class WireframeForm extends Component {
    state = {
        name: "",
        link: "",
        notes: "",
        img: "",
        loadingStatus: false,
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }
    constructNewWireframe = evt => {
        evt.preventDefault();
        if (this.state.name === "") {
            window.alert("Please enter a name.")
        } else {
            this.setState({ loadingStatus: true });
            const currentUser = JSON.parse(localStorage.getItem("credentials"))
            const wireframe = {
                name: this.state.name,
                link: this.state.link,
                notes: this.state.notes,
                userId: currentUser.id,
                imageUrl: this.state.img,
                projectId: this.props.location.state.project
            }
            APIManager.post("wireframes", wireframe)
                .then(() => this.props.history.push(`/project/${this.props.location.state.project}`))

        }
    }

    openCloudinaryWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                this.setState({
                    img: result.info.url
                })
            }
        }
        )
        widget.open();
    }

    render() {
        return (
            <>
                <div id="newWireframeForm">
                    <h2 className="new-project-header">New Wireframe</h2><hr />

                    <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Name" id="name" className="new-project-form-input" onChange={this.handleFieldChange} />
                            {/* <Form.Label>Link:</Form.Label> */}
                            <Form.Control type="text" id="link" placeholder="Enter Link" className="new-project-form-input" onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Notes" as="textarea" className="new-project-form-input" placeholder="Enter Notes" id="notes" onChange={this.handleFieldChange} />
                           <div className="upload_widget_container">
                            <Button type="button" id="upload_widget" className="cloudinary-button" onClick={this.openCloudinaryWidget}>Choose File</Button>
                            </div>
                        </Form.Group>
                        <Button
                            variant="light"

                            className="create-project-button"
                            type="button"
                            disabled={this.state.loadingStatus}
                            onClick={this.constructNewWireframe}
                        >Create Wireframe</Button>
                    </Form>
                </div>
            </>
        )
    }
}
export default WireframeForm