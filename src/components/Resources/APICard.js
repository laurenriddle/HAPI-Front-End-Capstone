import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
// import './Erd.css'

export class ApiCard extends Component {

    render() {
       
            return (
                <div className="apiCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-apiname">{this.props.api.name} <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/apis/${this.props.api.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" alt="delete symbol" onClick={() => this.props.deleteApi(this.props.api.id, "apis")} /></span></h2><hr />
                                <p>Description: {this.props.api.description}</p>
                                <p>API Key: {this.props.api.apiKey}</p>
                                <p>Notes: {this.props.api.notes}</p>
                                <hr />
                                <a href={this.props.api.link} rel="noopener noreferrer" target="_blank">+ View Resource</a>

                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
    export default ApiCard
    
   