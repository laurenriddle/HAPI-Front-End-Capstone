import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';






export class ListCard extends Component {


    render() {
        return (
            <>
                <div className="listCard card">
                    <Card>
                        <div className="card-contentnext">
                            <Card.Body>
                                <h2><span className="card-erdname">{this.props.result.API}<Button onClick={() => { this.props.history.push({ pathname: `/apisearch/${this.props.result.API}/save`,
                                state: {url: this.props.result.Link}
                                })}}>Save</Button></span></h2><hr />
                                <p>Description: {this.props.result.Description}</p>
                                <p>Auth: {this.props.result.Auth}</p>
                                <p>Cors: {this.props.result.Cors}</p>
                                <p>Category: {this.props.result.Category}</p>
                                <hr />
                                <a href={this.props.result.Link} rel="noopener noreferrer" target="_blank">+ View Resource</a>
                            </Card.Body>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}
export default ListCard
