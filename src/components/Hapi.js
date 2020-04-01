// Purpose: To render the app, which is navbar and application views
import React, { Component } from "react";
import ApplicationViews from "./ApplicationView";
import '../index.css'
import Navigation from "./Nav/NavBar";

class Hapi extends Component {

    state = {
        user: false
      }
    
      isAuthenticated = () => localStorage.getItem("credentials") !== null
    
      // this function sets local storage upon register or login to let the app know if the user is authenticated
      setUser = authObj => {
        localStorage.setItem("credentials", JSON.stringify(authObj))
        this.setState({
          user: this.isAuthenticated(),
        })
      }
    
      // this function clears local storage and directs the user to the register page when they push login
      clearUser = () => {
        localStorage.removeItem("credentials")
        this.setState({
          user: this.isAuthenticated()
        });
      }

      componentDidMount() {
        this.setState({
          // checks to see if the user is authenticated upon the app loading and sets the boolean that indicates this in state so the navbar will load correctly
          user: this.isAuthenticated()
        })
      }

    render() {
       return( <>
        <Navigation clearUser = {this.clearUser} user={this.state.user}/>
        <ApplicationViews setUser = {this.setUser} user={this.state.user}/>
        </>
       )
    };
}

export default Hapi;