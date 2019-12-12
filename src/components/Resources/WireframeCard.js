import React, { Component } from 'react';
import { Card } from 'react-bootstrap';
import './Erd.css'

export class WireframeCard extends Component {

    render() {
            return (
                <div className="wireframeCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-wireframename">{this.props.wireframe.name} <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/wireframe/${this.props.wireframe.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" alt="delete symbol" onClick={() => this.props.deleteWireframe(this.props.wireframe.id, "wireframes")} /></span></h2><hr />
                                <a href={this.props.wireframe.imageUrl} rel="noopener noreferrer" target="_blank"> <img src={this.props.wireframe.imageUrl} width="350" height="300" alt="wireframe" /></a>
                                <p>Notes: {this.props.wireframe.notes}</p><hr />
                                <a href={this.props.wireframe.link} rel="noopener noreferrer" target="_blank">+ View Resource</a>

                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
export default WireframeCard