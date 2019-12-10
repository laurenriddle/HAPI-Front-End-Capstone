import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

export class ErdCard extends Component {

    render() {
       
            return (
                <div className="erdCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-erdname">{this.props.erd.name}</span></h2><hr />
                                <p>Notes: {this.props.erd.notes}</p>
                                <p>Link: {this.props.erd.link}</p><hr />
                                <Button variant="primary" type="button" className="erd-button" onClick={() => this.props.deleteErd(this.props.erd.id, "erds")}>Delete</Button>
                                <Button variant="primary" type="button" className="erd-button"
                                    onClick={() => { this.props.history.push(`/erds/${this.props.erd.id}/edit`) }}>Edit</Button>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            );
        }
    }
    export default ErdCard