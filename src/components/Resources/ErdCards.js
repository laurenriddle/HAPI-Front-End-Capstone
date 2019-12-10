import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Erd.css'

export class ErdCard extends Component {

    render() {
       
            return (
                <div className="erdCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-erdname">{this.props.erd.name} <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" onClick={() => { this.props.history.push(`/erds/${this.props.erd.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" onClick={() => this.props.deleteErd(this.props.erd.id, "erds")} /></span></h2><hr />
                                <p>Notes: {this.props.erd.notes}</p><hr />
                                <a href={this.props.erd.link} target="_blank">+ View Resource</a>

                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
    export default ErdCard
    