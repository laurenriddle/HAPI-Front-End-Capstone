import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import ExternalAPIManager from '../../modules/ExternalAPIManager';
import ListCard from './ListCards';
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./ApiSearch.css"


class ApiList extends Component {
    state = {
        results: [],
        terms: "",
        loadingStatus: false,
        categories: []
    }

    componentDidMount() {
        let categories = [
            "Animals",
            "Anime",
            "Anti-Malware",
            "Art",
            "Design",
            "Books",
            "Business",
            "Calendar",
            "Cloud Storage",
            "File Sharing",
            "Continuous Integration",
            "Cryptocurrency",
            "Currency Exchange",
            "Data Validation",
            "Development",
            "Dictionaries",
            "Documents",
            "Productivity",
            "Environment",
            "Events",
            "Finance",
            "Drink",
            "Food",
            "Fraud Prevention",
            "Games",
            "Comics",
            "Geocoding",
            "Government",
            "Health",
            "Jobs",
            "Machine Learning",
            "Music",
            "News",
            "Open Data",
            "Open Source Projects",
            "Patent",
            "Personality",
            "Photography",
            "Science",
            "Math",
            "Security",
            "Shopping",
            "Social",
            "Sports",
            "Fitness",
            "Test Data",
            "Text Analysis",
            "Tracking",
            "Transportation",
            "URL Shorteners",
            "Vehicle",
            "Video",
            "Weather"
        ]
        this.setState(
            { categories: categories }
        )
    }
    handleFieldChange = evt => {
        const stateToChange = {}
        console.log(evt)
        stateToChange[evt.target.id] = evt[0]
        this.setState(stateToChange)
        console.log(stateToChange)
    }

    // this function searches the array to make sure the object does not already exist
    pushEntry = (array, item) => {
        // if the object does not already exist in the array, push the object into the array
        if (!array.find(({ Link }) => Link === item.Link)) {
            array.push(item);
        }
    }

    

    searchExternalApi = () => {
        // if (this.state.terms !== ""){
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
        // } else {
        //     window.alert("Please enter search terms below.")
        // }
    }

    render() {
        return (
            <>
                <section className="section-content api-search">
                    <Form>
                        <Form.Group className="search-form">
                            <Typeahead
                                //   ref="search-friends-typeahead"
                                id="terms"
                                className="terms"
                                labelKey="api"
                                placeholder="Search for an API"
                                options={this.state.categories}
                                onChange={(input) => {
                                    // console.log("hello")
                                    // console.log(input, evt)
                                    this.setState({ terms: input});
                                }
                                // this.handleFieldChange
                                }></Typeahead>
                            <Button className="terms-button" variant="light"
                                disabled={this.state.loadingStatus} onClick={this.searchExternalApi}><img alt="Search Icon" src={require('./SearchIcon.png')} width="25" height="25"></img></Button>
                        </Form.Group>
                    </Form>
                </section>
                <div className="api-search-container-cards">
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
                        })
                        }
                </div>
            </>
        )
    }
}


export default ApiList;