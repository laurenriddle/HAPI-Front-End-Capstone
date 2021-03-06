import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
export class ProjectCard extends Component {

    render() {
        return (
            <div className="projectCard card flip-card">
                <div className="project-card-content flip-card-inner">
                    <div className="flip-card-front">
                        <div className="card-projectname">{this.props.project.name} </div>
                    </div>
                    <div className="flip-card-back">

                      <div className="edit-delete"><img src={require('./EditSymbol.png')} width="25" height="25" className="erd-align-right crud" alt="edit symbol" onClick={() => { this.props.history.push(`/project/${this.props.project.id}/edit`) }} /> <img src={require('./DeleteSymbol.png')} width="25" height="25" className="crud" alt="delete symbol" onClick={() => this.props.deleteProject(this.props.project.id, "projects")} /></div>
                        <div className="project-description">{this.props.project.description}</div>
                        <div className="projectCard-button-container">
                        <a href={this.props.project.githubUrl} rel="noopener noreferrer" target="_blank"><Button variant="light" className="newProjectBtn">View GitHub</Button></a>
                        <Button variant="light" className="newProjectBtn" onClick={() => { this.props.history.push({ pathname: `/project/${this.props.project.id}`, state: { project: this.props.project } }) }}>View Project</Button></div>
        
                    </div>
                </div>
            </div>
        );
    }
}
export default ProjectCard
