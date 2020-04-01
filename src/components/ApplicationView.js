import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import LogIn from "./Auth/Login";
import Register from "./Auth/Registration";
import ResourceList from "./Resources/ResourceList";
import ErdForm from "./Resources/ErdForm";
import ErdEditForm from "./Resources/ErdEditForm";
import ApiList from "./ApiSearch/ApiList";
import APISaveForm from "./ApiSearch/SaveForm";
import ApiEditForm from "./Resources/ApiEditForm";
import Home from "./Home/Home";
import ApiForm from "./Resources/APIForm";
import WireframeForm from "./Resources/WireframeForm";
import WireframeEditForm from "./Resources/WireframeEditForm";
import TechnologyForm from "./Resources/TechnologyForm";
import TechnologyEditForm from "./Resources/TechnologyEditForm";
import ProjectList from "./Projects/ProjectList";
import ProjectForm from "./Projects/ProjectForm";
import ProjectEditForm from "./Projects/ProjectEdtForm";
import RandomList from "./Random/RandomList";
import RandomApiSaveForm from "./Random/RandomForm"
// Purpose: To render all app views

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>


        <Route
          exact path="/login" render={props => {
            if (this.props.user) {

              return <Redirect to="/" />
            } else {
              return <LogIn setUser={this.props.setUser} searchUsers={this.props.searchUsers}
                {...props} {...this.props} />
            }
          }}
        />
        <Route
          exact path="/Register" render={props => {
            if (this.props.user) {

              return <Redirect to="/projects" />
            } else {
              return <Register setUser={this.props.setUser} searchUsers={this.props.searchUsers}
                {...props} {...this.props} />
            }
          }}
        />


        <Route path="/erd/new" render={(props) => {
          if (this.props.user) {
            return <ErdForm {...props} {...this.props} />
          }
          else {

            return <Redirect to="/login" />
          }

        }} />
        <Route
          path="/erds/:erdId(\d+)/edit" render={props => {
            if (this.props.user) {

              return <ErdEditForm {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/apisearch" render={props => {
            if (this.props.user) {
              return <ApiList {...props} {...this.props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/" render={props => {
            if (this.props.user) {
              return <Redirect to="/projects" />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/random" render={props => {
            if (this.props.user) {
              return <RandomList {...props} {...this.props} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/apisearch/:name/save" render={(props, link) => {
            if (this.props.user) {
              return <APISaveForm {...props} {...this.props} {...link} />
            }
            else {

              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/random/:name/save" render={(props, link) => {
            if (this.props.user) {
              return <RandomApiSaveForm {...props} {...this.props} {...link} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/apis/:apiId(\d+)/edit" render={props => {
            if (this.props.user) {
              return <ApiEditForm {...props} {...this.props} />
            }
            else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/api/new" render={props => {
            if (this.props.user) {

              return <ApiForm {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route path="/wireframe/new" render={(props) => {
          if (this.props.user) {
            return <WireframeForm {...props} {...this.props} />
          } else {

            return <Redirect to="/login" />
          }
        }} />
        <Route
          path="/wireframe/:wireframeId(\d+)/edit" render={props => {

            if (this.props.user) {
              return <WireframeEditForm {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route path="/technology/new" render={(props) => {
          if (this.props.user) {

            return <TechnologyForm {...props} {...this.props} />
          } else {

            return <Redirect to="/login" />
          }
        }} />
        <Route
          path="/technology/:technologyId(\d+)/edit" render={props => {
            if (this.props.user) {
              return <TechnologyEditForm {...props} {...this.props} />
            }
            else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/projects" render={props => {
            if (this.props.user) {

              return <ProjectList {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/project/new" render={props => {
            if (this.props.user) {
              return <ProjectForm {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/project/:projectId(\d+)/edit" render={props => {
            if (this.props.user) {
              return <ProjectEditForm {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />
        <Route exact
          path="/project/:projectId(\d+)" render={props => {
            if (this.props.user) {
              return <ResourceList {...props} {...this.props} />
            } else {

              return <Redirect to="/login" />
            }
          }}
        />

      </React.Fragment>
    );
  }
}