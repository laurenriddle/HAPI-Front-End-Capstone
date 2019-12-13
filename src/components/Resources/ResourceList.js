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
        technologies: [],
        name: "",
        githubUrl: "",
        description: "",
        project: []

    }

    componentDidMount() {
        // get all friends for this user
        APIManager.get(`projects/${this.props.match.params.projectId}?_expand=erd`)
            .then(erds => {
                let erdArray = []
                if (erds.erd !== undefined) {
                    erdArray.push(erds.erd)
                    this.setState({ erds: erdArray })
                }
            })

        APIManager.get(`apis?projectId=${this.props.match.params.projectId}`)
            .then(apis => {
                this.setState({
                    apis: apis
                })
            })
        APIManager.get(`wireframes?projectId=${this.props.match.params.projectId}`)
            .then(wireframes => {
                this.setState({
                    wireframes: wireframes
                })
            })
        APIManager.get(`technologies?projectId=${this.props.match.params.projectId}`)
            .then(technologies => {
                this.setState({
                    technologies: technologies
                })
            })
        APIManager.get(`projects/${this.props.match.params.projectId}`)
            .then((project) => {
                this.setState({
                    project: project
                })
            })
    }

    deleteErd = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if (window.confirm("Are you sure you want to delete this ERD?")) {
            APIManager.get(`projects/${this.props.match.params.projectId}`)
                .then((project) => {
                    this.setState({
                        name: project.name,
                        githubUrl: project.githubUrl,
                        description: project.description,
                    })
                })
                .then(() => {
                    const editedProject = {
                        name: this.state.name,
                        githubUrl: this.state.githubUrl,
                        description: this.state.description,
                        userId: currentUser.id,
                        id: this.props.match.params.projectId,
                    }
                    APIManager.update("projects", editedProject)
                })
                .then(() => {
                    APIManager.get(`projects/${this.props.match.params.projectId}?_expand=erd`)
                })
                .then(erds => {
                    let erdArray = []
                    if (erds !== undefined) {
                        erdArray.push(erds.erd)
                        this.setState({ erds: erdArray })
                    } else {
                        this.setState({ erds: [] })
                    }
                })
        }
    }

    deleteApi = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        // confirm()
        if (window.confirm("Are you sure you want to delete this API?")) {
            APIManager.delete(`${endpoint}/${id}`)
                .then(() => {
                    APIManager.get(`apis?projectId=${this.props.match.params.projectId}`)
                        .then(apis => {
                            this.setState({ apis: apis })

                        })
                })
        }
    }

    deleteWireframe = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if (window.confirm("Are you sure you want to delete this wireframe?")) {
            APIManager.delete(`${endpoint}/${id}`)
                .then(() => {
                    APIManager.get(`wireframes?projectId=${this.props.match.params.projectId}`)
                        .then(wireframes => {
                            this.setState({ wireframes: wireframes })

                        })
                })
        }
    }


    deleteTechnology = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        if (window.confirm("Are you sure you want to delete this technology?")) {
            APIManager.delete(`${endpoint}/${id}`)
                .then(() => {
                    APIManager.get(`technologies?projectId=${this.props.match.params.projectId}`)
                        .then(technologies => {
                            this.setState({ technologies: technologies })

                        })
                })
        }
    }

    render() {
        return (
            <>
                <Button onClick={() => this.props.history.push("/projects")}>Back to Projects List</Button>
                <div>
                    <hr /><span><h1>{this.state.project.name}</h1><a href={this.state.project.githubUrl} rel="noopener noreferrer" target="_blank">+ View Resource</a><p>{this.state.project.description} </p><img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => {
                        this.props.history.push({
                            pathname: `/project/${this.props.match.params.projectId}/edit`, state: {
                                boolean: true,
                                project: this.props.location.state.project
                            }
                        })
                    }} /></span><hr />

                </div>
                <section className="section-content">
                    <Button type="button" className="newAPIBtn" onClick={() => { this.props.history.push({ pathname: "/api/new", state: { project: this.props.match.params.projectId } }) }}>Create New API</Button>
                    <Button type="button" className="newErdBtn" onClick={() => { this.props.history.push({ pathname: "/erd/new", state: { erd: this.state.erds[0], project: this.props.match.params.projectId } }) }}>Create New ERD</Button>
                    <Button type="button" className="newTechBtn" onClick={() => { this.props.history.push({ pathname: "/technology/new", state: { project: this.props.match.params.projectId } }) }}>Create New Technology</Button>
                    <Button type="button" className="newWireframeBtn" onClick={() => { this.props.history.push({ pathname: "/wireframe/new", state: { project: this.props.match.params.projectId } }) }}>Create New Wireframe</Button>
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
                    {this.state.erds.map((erd) => {
                        return <ErdCard
                            key={erd.id}
                            erd={erd}
                            deleteErd={this.deleteErd}
                            {...this.props}
                            projectId={this.props.match.params.projectId}
                        />

                    })
                    }
                </div>
                <hr /><h2><span>Wireframes</span></h2><hr />
                <div className="wireframe-container-cards">
                    {
                        this.state.wireframes.map((wireframe) => {
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