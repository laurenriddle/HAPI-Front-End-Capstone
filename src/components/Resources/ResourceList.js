import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';
import ErdCard from './ErdCards';


class ResourceList extends Component {
    state = {
        erds: [],
        apis: []
    }

    componentDidMount() {
        // get all friends for this user
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.get(`erds?userId=${currentUser.id}`)
            .then(erds => {
                this.setState({
                    erds: erds
                })

            })
    }

    deleteErd = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(erds => {
                        this.setState({ erds: erds })

                    })
            })
    }

    render() {
        return (
            <>
                <section className="section-content">
                </section>
                <div className="erd-container-cards">
                    <hr /><h2><span>APIs</span></h2><hr />
                    <hr /><h2><span>Entity Relationship Diagrams<Button type="button" className="newErdBtn" onClick={() => { this.props.history.push("/erd/new") }}>Create New ERD</Button>
                    </span></h2><hr />
                    {
                        this.state.erds.map((erd) => {
                            // if the index of the event is equal to 0, render the card with the bold text and background color
                            return <ErdCard
                                key={erd.id}
                                erd={erd}
                                deleteErd={this.deleteErd}
                                {...this.props}
                            />
                        })
                    }
                </div >
            </>
        )
    }
}


export default ResourceList;