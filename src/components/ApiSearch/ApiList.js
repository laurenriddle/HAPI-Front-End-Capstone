import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import ExternalAPIManager from '../../modules/ExternalAPIManager';
import ListCard from './ListCards';

let results = []
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
        console.log(this.state.terms)
    }

    pushEntry = (array, item) => {
        if (!array.find(({ Link }) => Link === item.Link)) {
            array.push(item);
        }
    }

    searchExternalApi = userInput => {
        results = []
        ExternalAPIManager.searchByDescription(this.state.terms)
            .then((response) => {
                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)
                    })
                    // console.log("description", results)
                }
            })
        ExternalAPIManager.searchByCategory(this.state.terms)
            .then(response => {

                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)
                    })
                }
                // console.log("category", results)

            })

        ExternalAPIManager.searchByTitle(this.state.terms)
            .then(response => {
                if (response.entries !== null) {
                    response.entries.forEach(entry => {
                        this.pushEntry(results, entry)

                    })
                }
                // console.log("title", results)

            }).then(() => {
                this.setState({
                    results: results,
                })
                // console.log("results after set state", this.state.results)

            })
    }

    render() {
        // if (this.state.results.length === 0) {

        //     return (
        //         <>
        //             <section className="section-content">
        //                 <Form>
        //                     <Form.Group>
        //                         <Form.Label>Search for APIs:</Form.Label>
        //                         <Form.Control type="text" placeholder="Enter Search Terms" id="terms" onChange={this.handleFieldChange} />
        //                     </Form.Group>
        //                 </Form>
        //                 <Button disabled={this.state.loadingStatus} onClick={this.searchExternalApi}>Search</Button>
        //             </section>
        //             <div className="erd-container-cards">
        //                 <hr /><h2>Search Results:</h2><hr />
        //                 <h3>No search results</h3>
        //             </div>
        //         </>
        //     )
        // }
        // else {
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
                        this.state.results.map((result, index) => {

                            // if (index < 20) {
                            return <ListCard
                                key={result.Link}
                                result={result}
                                {...this.props}
                            />
                            // }
                        })}
                </div>
            </>
        )
    }
    // }
}


export default ApiList;