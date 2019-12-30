import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
import { Form, InputGroup } from "react-bootstrap"
import "./Login.css"


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

    // the logic to handle registration. This calls functions from API manager.
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
                                        // then once the local storage is set, then take the user to the home page
                                        this.props.history.push("/projects")
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
                <div className="body-container">
                    <header className="body-element header-container">
                        {/* <div className="blob">
                            <svg xlink="http://www.w3.org/1999/xlink" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 350">
                                <path d="M156.4,339.5c31.8-2.5,59.4-26.8,80.2-48.5c28.3-29.5,40.5-47,56.1-85.1c14-34.3,20.7-75.6,2.3-111  c-18.1-34.8-55.7-58-90.4-72.3c-11.7-4.8-24.1-8.8-36.8-11.5l-0.9-0.9l-0.6,0.6c-27.7-5.8-56.6-6-82.4,3c-38.8,13.6-64,48.8-66.8,90.3c-3,43.9,17.8,88.3,33.7,128.8c5.3,13.5,10.4,27.1,14.9,40.9C77.5,309.9,111,343,156.4,339.5z" />
                            </svg>
                        </div> */}
                        {/* <img src={require('../Nav/Logo.png')} className="header" width="330" height="150" alt="Hapi Logo" /> */}
                        <p className="header">HAPI</p>
                        <h2 className="slogan"><span>Filler. Text. Here.</span></h2>
                    </header>
                    <div className="formgrid body-element form-container">
                        <Form className="register-form" onSubmit={this.handleRegistration}>
                            <Form.Group>
                                <h3 className="form-header">Register a New Account</h3><hr />
                                <div className="formgrid">
                                    <InputGroup className="mb-3 input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><img width="20" alt="password symbol" src={require('./UserIcon.png')}></img></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.handleFieldChange} type="text" id="firstName"
                                            placeholder="First Name"
                                            required="" autoFocus="" />
                                    </InputGroup>

                                    <InputGroup className="mb-3 input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><img width="20" alt="password symbol" src={require('./UserIcon.png')}></img></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.handleFieldChange} type="text"

                                            id="lastName"
                                            placeholder="Last Name"
                                            required="" autoFocus="" />
                                    </InputGroup>

                                    <InputGroup className="mb-3 input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1"><img width="15" alt="password symbol" src={require('./EmailIcon.png')}></img></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.handleFieldChange} type="email"
                                            id="email"
                                            placeholder="Email address"
                                            required="" autoFocus="" />
                                    </InputGroup>

                                    <InputGroup className="mb-3 input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1"><img width="15" alt="password symbol" src={require('./baseline_lock_black_18dp.png')}></img></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.handleFieldChange} type="password"
                                            id="password"
                                            placeholder="Password"
                                            required="" />
                                    </InputGroup>

                                    <InputGroup className="mb-3 input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1"><img width="15" alt="password symbol" src={require('./baseline_lock_black_18dp.png')}></img></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control onChange={this.handleFieldChange} type="password"
                                            id="confirmPassword"
                                            placeholder="Confirmation Password"
                                            required="" />
                                    </InputGroup>

                                </div>
                            </Form.Group>
                            <div className="register-button-container "><hr />
                                <button className="register-button" variant="light" type="submit">
                                    Register
                            </button>
                                <Link className="nav-link login-link" to="/Login">Already have an Account</Link>
                            </div>
                        </Form>
                    </div>
                </div>

            </>
        )
    }
}

export default Register
