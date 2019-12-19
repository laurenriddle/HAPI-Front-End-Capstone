import React, { Component } from 'react';
import { Card, Figure, Button } from 'react-bootstrap';
import './Erd.css'
import Image from 'react-bootstrap/Image'
export class WireframeCard extends Component {

    render() {
        return (
            <div className="wireframeCard">
                    <div className="wireframe-card-content">
                        <Card.Body>
                        <span className="card-wireframename"><h2>{this.props.wireframe.name} <img src={require('../Projects/EditSymbol.png')} width="25" height="25" className="erd-align-right symbols" alt="edit symbol" onClick={() => { this.props.history.push(`/wireframe/${this.props.wireframe.id}/edit`) }} /> <img src={require('../Projects/DeleteSymbol.png')} width="25" height="25" className="symbols" alt="delete symbol" onClick={() => this.props.deleteWireframe(this.props.wireframe.id, "wireframes")} /></h2><label className="Wireframe-label">Wireframe</label></span><hr />



                            <Figure className="img__wrap">
                                <a href={this.props.wireframe.imageUrl} rel="noopener noreferrer" target="_blank">
                                    <Image
                                        className="img__img"
                                        width={171}
                                        height={180}
                                        alt="wireframe"
                                        src={this.props.wireframe.imageUrl}
                                        thumbnail />
                                          <p className="img__description">Click to Enlarge</p>

                                </a>
                            </Figure>
                                    <section> {this.props.wireframe.notes}</section>
                            <hr />
                            <section>
                                <a href={this.props.wireframe.link} rel="noopener noreferrer" target="_blank"><Button variant="light" className="newProjectBtn">View Resource</Button></a>
                            </section>
                        </Card.Body>
                    </div>
            </div>
        );
    }
}
export default WireframeCard