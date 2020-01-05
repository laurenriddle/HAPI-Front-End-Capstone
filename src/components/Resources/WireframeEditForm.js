import React, { Component } from "react"
import APIManager from "../../modules/APIManager";
import { Form, Button } from 'react-bootstrap';
import { cloudName, uploadPreset } from "../../modules/Credentials";


class WireframeEditForm extends Component {
    //set the initial state
    state = {
        name: "",
        link: "",
        notes: "",
        img: "",
        projectId: "",
        loadingStatus: false,
    };
    
    componentDidMount() {
        APIManager.get(`wireframes/${this.props.match.params.wireframeId}`)
            .then(wireframe => {
    
                this.setState({
                    name: wireframe.name,
                    notes: wireframe.notes,
                    link: wireframe.link,
                    loadingStatus: false,
                    img: wireframe.imageUrl,
                    projectId: wireframe.projectId
                });
    
            });
    }
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingWireframe = evt => {
        evt.preventDefault()
        if (this.state.name ==="") {
            window.alert("Please enter a name.")
        } else {
        this.setState({ loadingStatus: true });
        const currentUser = JSON.parse(localStorage.getItem("credentials"))


        const editedWireframe = {
            name: this.state.name,
            notes: this.state.notes,
            link: this.state.link,
            userId: currentUser.id,
            id: this.props.match.params.wireframeId,
            imageUrl: this.state.img,
            projectId: this.state.projectId

        }
        APIManager.update("wireframes", editedWireframe)
            .then(() => this.props.history.push(`/project/${this.state.projectId}`))
    }}

    openCloudinaryWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                // newImage = 
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
                <div id="wireframeEditForm">
                <h2 className="new-project-header">Edit Wireframe</h2>

                   <hr /> <Form>
                        <Form.Group>
                            {/* <Form.Label>Name:</Form.Label> */}
                            <Form.Control type="text" placeholder="Enter Name" className="new-project-form-input" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            {/* <Form.Label>Notes:</Form.Label> */}
                            {/* <Form.Label>Link:</Form.Label> */}
                            <Form.Control type="text" id="link" placeholder="Enter Link"  className="new-project-form-input" placeholder="Enter Link" value={this.state.link} onChange={this.handleFieldChange} />
                            <Form.Control type="text" id="notes" as="textarea" placeholder="Enter Notes"  className="new-project-form-input" placeholder="Enter Notes" value={this.state.notes} onChange={this.handleFieldChange} />
                            <div className="upload_widget_container">

                            <Button type="button" id="upload_widget" className="cloudinary-button" onClick={this.openCloudinaryWidget}>Choose File</Button>
                       </div>
                        </Form.Group> <hr /> 
                        <Button
                            type="button"
                            variant="light"
                            className="create-project-button"
                            disabled={this.state.loadingStatus}
                            onClick={this.updateExistingWireframe}
                        >Save</Button>
                    </Form>
                </div>
            </>
        );
    }
}

export default WireframeEditForm