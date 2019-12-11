import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';
import ErdCard from './ErdCards';
import ApiCard from './APICard';


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
        APIManager.get(`apis?userId=${currentUser.id}`)
        .then(apis => {
            this.setState({
                apis: apis
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

    deleteApi = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(apis => {
                        this.setState({ apis: apis })

                    })
            })
    }

    render() {
        return (
            <>
                <section className="section-content">
                <Button type="button" className="newAPIBtn" onClick={() => { this.props.history.push("/api/new") }}>Create New API</Button>
                <Button type="button" className="newErdBtn" onClick={() => { this.props.history.push("/erd/new") }}>Create New ERD</Button>
                <Button type="button" className="newTechBtn" onClick={() => { this.props.history.push("/technology/new") }}>Create New Technology</Button>
                <Button type="button" className="newWireframeBtn" onClick={() => { this.props.history.push("/wireframe/new") }}>Create New Wireframe</Button>
                </section>
                    <hr /><h2><span>APIs</span></h2><hr />
                <div className="api-container-cards"> 
                    {
                        this.state.apis.map((api) => {
                            return <ApiCard
                                key={api.id}
                                api={api}
                                deleteApi={this.deleteApi}
                                {...this.props}
                            />
                        })
                    }
                </div>
                    <hr /><h2><span>Entity Relationship Diagrams
                    </span></h2><hr />
                <div className="erd-container-cards">
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