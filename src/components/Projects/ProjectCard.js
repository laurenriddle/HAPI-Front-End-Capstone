import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
export class ProjectCard extends Component {

    render() {
        console.log(this.props.project)
        return (
            <div className="projectCard card">
                <Card>
                    <div className="card-contentnext">
                        <Card.Body>
                            <h2><span className="card-projectname">{this.props.project.name} <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/project/${this.props.project.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" alt="delete symbol" onClick={() => this.props.deleteProject(this.props.project.id, "projects")} /></span></h2><hr />
                            <h6>{this.props.project.description}</h6>
                            <a href={this.props.project.githubUrl} rel="noopener noreferrer" target="_blank"><Button>View Git Hub</Button> </a>
                            <hr />
                            <a onClick={() => { this.props.history.push({ pathname: `/project/${this.props.project.id}`, state: { project: this.props.project} }) }}>View Project</a>

                        </Card.Body>
                    </div>
                </Card>
            </div>
        );
    }
}
export default ProjectCard
