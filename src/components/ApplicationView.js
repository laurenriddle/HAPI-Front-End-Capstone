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

              return <Redirect to="/" />
            } else {
              return <Register setUser={this.props.setUser} searchUsers={this.props.searchUsers}
                {...props} {...this.props} />
            }
          }}
        />


        <Route path="/erd/new" render={(props) => {
          return <ErdForm {...props} {...this.props} />

        }} />
        <Route
          path="/erds/:erdId(\d+)/edit" render={props => {
            return <ErdEditForm {...props} {...this.props} />
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
              return <Home {...props} />
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
            return <APISaveForm {...props} {...this.props} {...link} />
          }}
        />

        <Route
          path="/random/:name/save" render={(props, link) => {
            return <RandomApiSaveForm {...props} {...this.props} {...link} />
          }}
        />
        <Route
          path="/apis/:apiId(\d+)/edit" render={props => {
            return <ApiEditForm {...props} {...this.props} />
          }}
        />
        <Route
          path="/api/new" render={props => {
            return <ApiForm {...props} {...this.props} />
          }}
        />
        <Route path="/wireframe/new" render={(props) => {
          return <WireframeForm {...props} {...this.props} />

        }} />
        <Route
          path="/wireframe/:wireframeId(\d+)/edit" render={props => {
            return <WireframeEditForm {...props} {...this.props} />
          }}
        />
        <Route path="/technology/new" render={(props) => {
          return <TechnologyForm {...props} {...this.props} />

        }} />
        <Route
          path="/technology/:technologyId(\d+)/edit" render={props => {
            return <TechnologyEditForm {...props} {...this.props} />
          }}
        />
        <Route
          path="/projects" render={props => {
            if (this.props.user) {

            return <ProjectList {...props} {...this.props} />} else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          path="/project/new" render={props => {
            return <ProjectForm {...props} {...this.props} />
          }}
        />
        <Route
          path="/project/:projectId(\d+)/edit" render={props => {
            return <ProjectEditForm {...props} {...this.props} />
          }}
        />
        <Route exact
          path="/project/:projectId(\d+)" render={props => {
            return <ResourceList {...props} {...this.props} />
          }}
        />

      </React.Fragment>
    );
  }
}