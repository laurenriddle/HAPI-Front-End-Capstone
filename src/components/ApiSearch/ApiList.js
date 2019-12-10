import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import ExternalAPIManager from '../../modules/ExternalAPIManager';
import ListCard from './ListCards';


class ApiList extends Component {
    state = {
        results: [],
        terms: "",
        loadingStatus: false
    }

    // componentDidMount() {
    //     // get all friends for this user
    //     // const currentUser = JSON.parse(localStorage.getItem("credentials"))
    //     // APIManager.get(`erds?userId=${currentUser.id}`)
    //     //     .then(erds => {
    //     //         this.setState({
    //     //             erds: erds
    //     //         })

    //     //     })
    // }
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
        console.log(this.state.terms)
    }

    searchExternalApi = userInput => {
        console.log(this.state.terms)
        ExternalAPIManager.searchByDescription(this.state.terms)
            .then((Response) => {
                this.setState({
                    results: Response.entries
                })
                console.log(this.state.results)
            })
    }
    render() {
        if (this.state.results === null) {

            return (
                <>
                    <section className="section-content">
                        <Form>
                            <Form.Group>
                                <Form.Label>Search for APIs:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Search Terms" id="terms" onChange={this.handleFieldChange} />
                            </Form.Group>
                            <Button disabled={this.state.loadingStatus} onClick={this.searchExternalApi}>Search</Button>
                        </Form>
                    </section>
                    <div className="erd-container-cards">
                        <hr /><h2>Search Results:</h2><hr />
                        <h3>No search results</h3>
                    </div>
                </>
            )
        }
        else {
            return (
                <>
                    <section className="section-content">
                        <Form>
                            <Form.Group>
                                <Form.Label><h3>Search for APIs:</h3></Form.Label>
                                <Form.Control type="text" placeholder="Enter Search Terms" id="terms" onChange={this.handleFieldChange} />
                            </Form.Group>
                            <Button disabled={this.state.loadingStatus} onClick={this.searchExternalApi}>Search</Button>
                        </Form>
                    </section>
                    <div className="erd-container-cards">
                        <hr /><h2>Search Results:</h2><hr />
                        {
                            this.state.results.map((result) => {
                                // if the index of the event is equal to 0, render the card with the bold text and background color
                               console.log(result)
                                return <ListCard
                                    key={result.Link}
                                    result={result}
                                    {...this.props}
                                />
                            })}
                    </div>
                </>
            )
        }
    }
}


export default ApiList;