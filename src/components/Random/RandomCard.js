import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';






export class RandomCard extends Component {


    render() {
        return (
            <>
                <div className="random">
                    <Card className="list-card-content">
                        <div className="list-card-content ">
                            <Card.Body className="list-card-body">
                                <h2><span className="card-erdname">{this.props.result.API}</span></h2>                                
                                <hr className="list-card-hr"/>

                                <p>Description: {this.props.result.Description}</p>
                                <p>Auth: {this.props.result.Auth}</p>
                                <p>Cors: {this.props.result.Cors}</p>
                                <p>Category: {this.props.result.Category}</p>
                                <hr className="list-card-hr"/>
                            </Card.Body>
                            <Card.Footer>
                            <a href={this.props.result.Link} rel="noopener noreferrer" target="_blank" className="list-card-link"><Button variant="light" className="search-results-save-btn">View Resource</Button></a> 
                            <Button variant="light" className="search-results-save-btn" onClick={() => {
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
export default RandomCard
