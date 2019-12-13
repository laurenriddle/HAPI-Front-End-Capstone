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

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // this function searches the array to make sure the object does not already exist
    pushEntry = (array, item) => {
        // if the object does not already exist in the array, push the object into the array
        if (!array.find(({ Link }) => Link === item.Link)) {
            array.push(item);
        }
    }

    searchExternalApi = () => {
        // set results to an empty array
        let results = []
        // search external API by description, using user's search terms
        ExternalAPIManager.searchByDescription(this.state.terms)
            .then((response) => {
                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)
                    })
                }
            }).then(() => ExternalAPIManager.searchByCategory(this.state.terms))
            .then(response => {

                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)
                    })
                }
            })

            .then(() => ExternalAPIManager.searchByTitle(this.state.terms))
            .then(response => {
                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)

                    })
                }

            })



            // search external API by title, using user's search terms
            // after search results come back and have been put in the results array, set the results key in state equal to the results array
            .then(() => {
                this.setState({
                    results: results,
                })

            })
    }

    render() {
        return (
            <>
                <section className="section-content">
                    <Form>
                        <Form.Group>
                            <Form.Label><h3>Search for an API:</h3></Form.Label>
                            <Form.Control type="text" placeholder="Enter Search Terms" id="terms" onChange={this.handleFieldChange} />
                        </Form.Group>
                        <Button disabled={this.state.loadingStatus} onClick={this.searchExternalApi}>Search</Button>
                    </Form>
                </section>
                <div className="erd-container-cards">
                    <hr /><h2>Search Results:</h2><hr />
                    {
                        this.state.results.map((result, index) => {
                            if (index < 50) {
                                return <ListCard
                                    key={result.Link}
                                    result={result}
                                    {...this.props}
                                    keyId={index}
                                />
                            }
                        })}
                </div>
            </>
        )
    }
}


export default ApiList;