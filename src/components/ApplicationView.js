import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import LogIn from "./Auth/Login";
import Register from "./Auth/Registration";
import ResourceList from "./Resources/ResourceList";
import ErdForm from "./Resources/ErdForm";
import ErdEditForm from "./Resources/ErdEditForm";
import ApiList from "./ApiSearch/ApiList";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>


        <Route
          exact path="/login" render={props => {
            // console.log("app view", this.props.user)
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
            // console.log("app view", this.props.user)
            if (this.props.user) {

              return <Redirect to="/" />
            } else {
              return <Register setUser={this.props.setUser} searchUsers={this.props.searchUsers}
                {...props} {...this.props} />
            }
          }}
        />
        <Route
          exact path="/Resources" render={props => {

            return <ResourceList {...props} />
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
          path="/apisearch" render={props => {
            return <ApiList {...props} {...this.props} />
          }}
        />
        {/* <Route
            exact path="/" render={props => {
              
              return <Home />
              }}
          /> */}



      </React.Fragment>
    );
  }
}