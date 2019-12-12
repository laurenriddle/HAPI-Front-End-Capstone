import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Erd.css'

export class TechnologyCard extends Component {

    render() {
            return (
                <div className="technologyCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-technologyname">{this.props.technology.name} <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/technology/${this.props.technology.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" alt="delete symbol" onClick={() => this.props.deleteTechnology(this.props.technology.id, "technologies")} /></span></h2><hr />
                                <p>Notes: {this.props.technology.notes}</p><hr />
                                <a href={this.props.technology.link} rel="noopener noreferrer" target="_blank">+ View Resource</a>

                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
export default TechnologyCard