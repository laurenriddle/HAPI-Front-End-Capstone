import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'
import { Button } from 'react-bootstrap';
import { ProjectCard } from './ProjectCard';



class ProjectList extends Component {
    state = {
        projects: [],
    }

    componentDidMount() {
        // get all friends for this user
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        APIManager.get(`projects?userId=${currentUser.id}`)
            .then(projects => {
                this.setState({
                    projects: projects
                })

            })
    }

    deleteProject = (id, endpoint) => {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        console.log(id)
        APIManager.delete(`${endpoint}/${id}`)
            .then(() => {
                APIManager.get(`${endpoint}?userId=${currentUser.id}`)
                    .then(projects => {
                        this.setState({ projects: projects })

                    })
            })
    }


    render() {
        return (
            <>
                <section className="section-content">
                <Button type="button" className="newProjectBtn" onClick={() => { this.props.history.push("/project/new") }}>Create New Project</Button>
                </section>
                    <hr /><h2><span>Projects</span></h2><hr />
                <div className="api-container-cards"> 
                    {
                        this.state.projects.map((project) => {
                            return <ProjectCard
                                key={project.id}
                                project={project}
                                deleteProject={this.deleteProject}
                                {...this.props}
                            />
                        })
                    }
                </div>
                
             
            </>
        )
    }
}


export default ProjectList;