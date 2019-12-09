import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

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
              return <Login setUser={this.props.setUser} searchUsers={this.props.searchUsers}
               {...props} {...this.props} />
              }}}
          />
          <Route
            exact path="/" render={props => {
              
              return <Home />
              }}
          />

  
  
        </React.Fragment>
      );
    }
  }