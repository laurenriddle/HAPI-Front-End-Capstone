import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"


class Register extends Component {

    // Set initial state
    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        loadingStatus: false,
        confirmPassword: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // the logic to handle registration. This calls functions from Article manager.
    handleRegistration = (e) => {
        e.preventDefault()
        // if statements for validating password
        if (this.state.password === '') {
            alert("Please enter Password");
        }
        // If confirm password not entered 
        else if (this.state.confirmPassword === '') {
            alert("Please enter confirm password");
        }
        // If Not same return False.     
        else if (this.state.password !== this.state.confirmPassword) {
            alert("Password did not match: Please try again...")
            return false;
        } else 
        // posts new user to database if the user does not already exist
        {
            // search for user in database
            APIManager.searchUser(this.state.email)
                .then((existingUser) => {
                    // if user does not exist, then post them to the database as a new user
                    if (existingUser.length === 0) {
                        this.setState({ loadingStatus: true })
                        const userObj = {
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            password: this.state.password,
                        }
                        // post user to database
                        APIManager.postNewUser(userObj)
                            .then(newUser => {
                                // get user that we just posted
                                APIManager.getRegisteredUser(this.state.email)
                                    .then(users => {
                                        users.forEach(user => {
                                            // call the set user function from nutshell.js to set local storage.
                                            this.props.setUser(user)
                                        });
                                        // then once the local storage is set, then take the user to the articles page
                                        this.props.history.push("/")
                                    })
                            })
                    } else {
                        // if the search user function come back with a user, then alert the user that they already have an account
                        window.alert("User already has an account")
                    }
                }
                )
        }
    }
   

    render() {
        return (
            <>
            <br/>
            <center><h1>Create a New Account</h1></center>
            <form onSubmit={this.handleRegistration}>
                <fieldset>
                    <h3>Register Account</h3>
                    <div className="formgrid">
                        <input onChange={this.handleFieldChange} type="text"
                        
                            id="firstName"
                            placeholder="First Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputFirstName">First Name</label>
                        <input onChange={this.handleFieldChange} type="text"
                        
                            id="lastName"
                            placeholder="Last Name"
                            required="" autoFocus="" />
                        <label htmlFor="inputLastName">Last Name</label>

                        <input onChange={this.handleFieldChange} type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                        <label htmlFor="inputEmail">Email address</label>

                        <input onChange={this.handleFieldChange} type="password"
                            id="password"
                            placeholder="Password"
                            required="" />
                        <label htmlFor="inputPassword">Password</label>

                        <input onChange={this.handleFieldChange} type="password"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            required="" />
                        <label htmlFor="inputPassword">Confirm Password</label>
                    </div>
                    <button type="submit">
                        Register
                    </button>
                </fieldset>
            </form>
            <Link className="nav-link" to="/Login">Already Have An Account!</Link>

            </>
        )
    }
}

    export default Register
