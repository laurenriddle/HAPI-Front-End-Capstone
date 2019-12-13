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
        console.log(editedWireframe)
        APIManager.update("wireframes", editedWireframe)
            .then(() => this.props.history.push(`/project/${this.state.projectId}`))
    }

    openCloudinaryWidget = () => {
        let widget = window.cloudinary.createUploadWidget({
            cloudName: cloudName,
            uploadPreset: uploadPreset
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
                // newImage = 
                this.setState({
                    img: result.info.url
                })
                console.log(this.state.img)
            }
        }
        )
        widget.open();
        // console.log("new image", this.state)
    }

    render() {
        return (
            <>
                <div id="wireframeEditForm">
                    <Form>
                        <Form.Group>
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" id="name" value={this.state.name} onChange={this.handleFieldChange} />
                            <Form.Label>Notes:</Form.Label>
                            <Form.Control type="text" id="notes" value={this.state.notes} onChange={this.handleFieldChange} />
                            <Form.Label>Link:</Form.Label>
                            <Form.Control type="text" id="link" value={this.state.link} onChange={this.handleFieldChange} />
                            <Button type="button" id="upload_widget" className="cloudinary-button" onClick={this.openCloudinaryWidget}>Upload files</Button>
                        </Form.Group>
                        <Button
                            type="button"
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