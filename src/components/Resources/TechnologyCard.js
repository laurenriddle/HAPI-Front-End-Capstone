import React, { Component } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import './Erd.css'

export class TechnologyCard extends Component {

    render() {
            return (
                <div className="technologyCard ">
                        <div className="technology-card-content">
                            <Card.Body>
                            <span className="card-technology-name"><h2>{this.props.technology.name} <img src={require('../Projects/EditSymbol.png')} width="25" height="25" className="erd-align-right symbols" alt="edit symbol" onClick={() => { this.props.history.push(`/technology/${this.props.technology.id}/edit`) }} /> <img src={require('../Projects/DeleteSymbol.png')} width="25" height="25" className="symbols" alt="delete symbol" onClick={() => this.props.deleteTechnology(this.props.technology.id, "technologies")} /></h2><Badge variant="secondary" className="Technology-label">Technology</Badge></span><hr />
                                <p>Notes: {this.props.technology.notes}</p><hr />
                                <a href={this.props.technology.link} rel="noopener noreferrer" target="_blank"><Button variant="light" className="newProjectBtn">View Resource</Button></a>

                            </Card.Body>
                        </div>
                </div>
            );
        }
    }
export default TechnologyCard