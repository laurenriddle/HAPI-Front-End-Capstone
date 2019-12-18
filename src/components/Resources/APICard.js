import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
// import './Erd.css'

export class ApiCard extends Component {

    render() {

        return (
            <div className="apiCard card">
                <div className="api-card-content">
                    <Card.Body> 
                    <span className="card-api-name"> <h2>{this.props.api.name} <img src={require('../Projects/EditSymbol.png')} width="30" height="30" className="erd-align-right symbols" alt="edit symbol" onClick={() => { this.props.history.push(`/apis/${this.props.api.id}/edit`) }} /> <img src={require('../Projects/DeleteSymbol.png')} width="30" height="30" className="symbols" alt="delete symbol" onClick={() => this.props.deleteApi(this.props.api.id, "apis")} /></h2><label className="Api-label">API</label></span><hr />
                        <p>Description: {this.props.api.description}</p>
                        <p>API Key: {this.props.api.apiKey}</p>
                        <p>Notes: {this.props.api.notes}</p>
                        <hr />
                        <a href={this.props.api.link} rel="noopener noreferrer" target="_blank"><Button variant="light" className="newProjectBtn">View Resource</Button></a>

                    </Card.Body>
                </div>
            </div>
        );
    }
}
export default ApiCard

