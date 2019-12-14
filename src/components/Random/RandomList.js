import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ExternalAPIManager from '../../modules/ExternalAPIManager';
import RandomCard from './RandomCard';

class RandomList extends Component {
    state = {
        results: [],
        loadingStatus: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        ExternalAPIManager.getRandomApi()
            .then((api) => {
                this.setState({
                    results: api.entries,
                })

            })
    }

    searchForRandomApi = () => {
        ExternalAPIManager.getRandomApi()
            .then((api) => {
                this.setState({
                    results: api.entries,
                })

            })

    }

    render() {
        return (
            <>

                <div className="random-container-cards">
                    <hr /><h2>Random API:</h2><hr />
                    {
                        this.state.results.map((result, index) => {
                            return <RandomCard
                                key={result.Link}
                                result={result}
                                {...this.props}
                                keyId={index}
                            />
                        })}
                </div>
                <Button disabled={this.state.loadingStatus} onClick={this.searchForRandomApi}>Generate Random API</Button>
            </>
        )
    }
}


export default RandomList;