import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import "./ApiSearch.css"





export class ListCard extends Component {


    render() {
        return (
            <>
                <div className="listCard">
                    <Card className="list-card-content">
                        <div className="list-card-content">
                            <Card.Title>
                                <h2><span className="card-listname">{this.props.result.API}</span></h2></Card.Title>
                            <Card.Body className="list-card-body">
                                <hr className="list-card-hr"/>
                                <p>Description: {this.props.result.Description}</p>
                                <p>Auth: {this.props.result.Auth}</p>
                                <p>Cors: {this.props.result.Cors}</p>
                                <p>Category: {this.props.result.Category}</p>
                                <hr className="list-card-hr"/>
                            </Card.Body>
                            <Card.Footer>
                            <a href={this.props.result.Link} rel="noopener noreferrer" target="_blank" className="list-card-link"><Button variant="light" className="search-results-save-btn">View Resource</Button></a> 
                                <Button className="search-results-save-btn" onClick={() => {
                                    this.props.history.push({
                                        pathname: `/apisearch/${this.props.result.API}/save`,
                                        state: { url: this.props.result.Link }
                                    })
                                }}>Save to Project</Button>
                            </Card.Footer>
                        </div>
                    </Card>
                </div>
            </>
        );
    }
}
export default ListCard
