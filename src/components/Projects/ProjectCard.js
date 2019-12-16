import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
export class ProjectCard extends Component {

    render() {
        return (
            <div className="projectCard card flip-card">
                <Card className="project-card-content flip-card-inner">
                    <Card.Body className="flip-card-front">
                        <Card.Title><span className="card-projectname">{this.props.project.name} </span></Card.Title>
                    </Card.Body>
                    <div className="flip-card-back">
                        <img src={require('./EditSymbol.png')} width="20" height="20" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/project/${this.props.project.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="20" height="20" className="crud" alt="delete symbol" onClick={() => this.props.deleteProject(this.props.project.id, "projects")} />
                        <a href={this.props.project.githubUrl} rel="noopener noreferrer" target="_blank"><Button>View Git Hub</Button></a>

                        <a onClick={() => { this.props.history.push({ pathname: `/project/${this.props.project.id}`, state: { project: this.props.project } }) }}>View Project</a>
                        <h6>{this.props.project.description}</h6>
                    </div>
                </Card>
            </div>
        );
    }
}
export default ProjectCard
