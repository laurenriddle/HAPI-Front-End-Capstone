import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './Erd.css'

export class ErdCard extends Component {

    render() {
                   return (
                <div className="erdCard card">
                        <div className="erd-card-content">
                            <Card.Body>
                            <span className="card-erd-name"><h2>{this.props.erd.name} <img src={require('../Projects/EditSymbol.png')} width="25" height="25" className="erd-align-right  symbols" alt="edit symbol" onClick={() => { this.props.history.push({ pathname: `/erds/${this.props.erd.id}/edit`, state: { project: this.props.projectId } }) }} /> <img src={require('../Projects/DeleteSymbol.png')} width="25" height="25" className="symbols" alt="delete symbol" onClick={() => this.props.deleteErd(this.props.erd.id, "erds")} /></h2><Badge variant="secondary" className="Erd-label">ERD</Badge></span><hr />
                                <p>Notes: {this.props.erd.notes}</p><hr />
                                <a href={this.props.erd.link} rel="noopener noreferrer" target="_blank"><Button variant="light" className="newProjectBtn">View Resource</Button></a>

                            </Card.Body>
                        </div>
                </div>
            );
        }
    }
    export default ErdCard
    