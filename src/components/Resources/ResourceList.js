import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button, Jumbotron, ButtonGroup, Tabs, Tab } from 'react-bootstrap';
import ErdCard from './ErdCards';
import ApiCard from './APICard';
import WireframeCard from './WireframeCard';
import TechnologyCard from './TechnologyCard';

import "./API.css"
import "./Erd.css"
import "./Wireframe.css"
import "./Technology.css"
import "./ResourceList.css"


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

                <Jumbotron className="Jumbotron">
                    <h1 className="align-button-right">{this.state.project.name} 
                    {/* <img src={require('../Projects/EditSymbol.png')} width="25" height="25" className="erd-align-right symbols" alt="edit symbol" onClick={() => {
                        this.props.history.push({
                            pathname: `/project/${this.props.match.params.projectId}/edit`, state: {
                                boolean: true,
                                project: this.props.location.state.project
                            }
                        })
                    }} /> */}

                    </h1>  <p>{this.state.project.description} </p>
                    <p>
                        <a href={this.state.project.githubUrl} rel="noopener noreferrer" target="_blank"><Button variant="secondary" type="button" className="newProjectBtn">View GitHub</Button></a>
                    </p>
                </Jumbotron>
                <div className="ButtonGroup">
                    <ButtonGroup aria-label="Basic example">

                        <Button type="button" variant="secondary" className="newAPIBtn newProjectBtn" onClick={() => { this.props.history.push({ pathname: "/api/new", state: { project: this.props.match.params.projectId } }) }}>New API</Button>
                        <Button type="button" variant="secondary" className="newErdBtn newProjectBtn" onClick={() => { this.props.history.push({ pathname: "/erd/new", state: { erd: this.state.erds[0], project: this.props.match.params.projectId } }) }}>New ERD</Button>
                        <Button type="button" variant="secondary" className="newWireframeBtn newProjectBtn" onClick={() => { this.props.history.push({ pathname: "/wireframe/new", state: { project: this.props.match.params.projectId } }) }}>New Wireframe</Button>
                        <Button type="button" variant="secondary" className="newTechBtn newProjectBtn" onClick={() => { this.props.history.push({ pathname: "/technology/new", state: { project: this.props.match.params.projectId } }) }}>New Technology</Button>
                    </ButtonGroup>
                </div>
                {/* <Button onClick={() => this.props.history.push("/projects")}>Back to Projects List</Button> */}
                <div>
                    {/* <hr /><span ></span><hr /> */}

                </div>

                <Tabs defaultactivekey="First" className="Tabs" id="uncontrolled-tab-example">
                    <Tab  className="Tab" eventKey="First" title="APIs" >
                        <div className="api-container-cards slideshow-container">

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
                    </Tab>
                    <Tab  className="Tab" eventKey="Second" title="Entity Relationship Diagrams">

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
                    </Tab>
                    <Tab  className="Tab" eventKey="Third" title="Wireframes">
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
                    </Tab>
                    <Tab  className="Tab" eventKey="Fourth" title="Other Technologies">
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
                    </Tab>
                </Tabs>
           
            </>
        )
    }
}


export default ResourceList;