import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';
import ErdCard from './ErdCards';
import ApiCard from './APICard';
import WireframeCard from './WireframeCard';
import TechnologyCard from './TechnologyCard';


class ResourceList extends Component {
    state = {
        erds: [],
        apis: [],
        wireframes: [],
        technologies: []
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
        APIManager.get(`wireframes?userId=${currentUser.id}`)
        .then(wireframes => {
            this.setState({
                wireframes: wireframes
            })
        })
        APIManager.get(`technologies?userId=${currentUser.id}`)
        .then(technologies => {
            this.setState({
                technologies: technologies
            })
        })
    }

    deleteErd = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if(window.confirm("Are you sure you want to delete this ERD?")){
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(erds => {
                        this.setState({ erds: erds })

                    })
            })
        }
    }

    deleteApi = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        // confirm()
        if(window.confirm("Are you sure you want to delete this API?")){
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(apis => {
                        this.setState({ apis: apis })

                    })
            })
        }
    }

    deleteWireframe = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if(window.confirm("Are you sure you want to delete this wireframe?")){
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(wireframes => {
                        this.setState({ wireframes: wireframes })

                    })
            })
        }
    }


    deleteTechnology = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if(window.confirm("Are you sure you want to delete this technology?")){
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(technologies => {
                        this.setState({ technologies: technologies })

                    })
            })
        }
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
                <hr /><h2><span>Wireframes</span></h2><hr />
                <div className="wireframe-container-cards">
                    {
                        this.state.wireframes.map((wireframe) => {
                            // if the index of the event is equal to 0, render the card with the bold text and background color
                            return <WireframeCard
                                key={wireframe.id}
                                wireframe={wireframe}
                                deleteWireframe={this.deleteWireframe}
                                {...this.props}
                            />
                        })
                    }
                </div >
                <hr /><h2><span>Other Technologies</span></h2><hr />
                <div className="technologies-container-cards">
                    {
                        this.state.technologies.map((technology) => {
                            // if the index of the event is equal to 0, render the card with the bold text and background color
                            return <TechnologyCard
                                key={technology.id}
                                technology={technology}
                                deleteTechnology={this.deleteTechnology}
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