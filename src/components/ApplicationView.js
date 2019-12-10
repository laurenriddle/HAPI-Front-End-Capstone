import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import LogIn from "./Auth/Login";
import Register from "./Auth/Registration";
import ResourceList from "./Resources/ResourceList";

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
              }}}
          />
           <Route
            exact path="/Register" render={props => {
              // console.log("app view", this.props.user)
              if (this.props.user) {
  
              return <Redirect to="/" />
              } else {
              return <Register setUser={this.props.setUser} searchUsers={this.props.searchUsers}
               {...props} {...this.props} />
              }}}
          />
          <Route
            exact exact path="/Resources" render={props => {
              // console.log("app view", this.props.user)
             
              return <ResourceList {...props} />
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