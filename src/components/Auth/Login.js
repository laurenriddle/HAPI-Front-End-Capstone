import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import { Form, Button, InputGroup } from "react-bootstrap"


class LogIn extends Component {

    // Set initial state
    state = {
        username: "",
        email: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()

        APIManager.searchUser(this.state.email)
            .then((existingUser) => {
                if (existingUser.length === 0) {
                    alert("User does not have an account")
                } else {
                    const user = existingUser[0]
                    if (user.password === this.state.password) {
                        this.props.setUser(user)
                        this.props.history.push("/")
                    } else {
                        alert("Incorrect Password, Try Again.")
                    }
                }
            })
    }

    render() {
        return (
            <>
                <div className="body-container">
                    <header className="body-element header-container">
                        <img src={require('../Nav/Logo.png')} className="header" width="330" height="150" alt="Hapi Logo" />
                        <h2 >Filler. Text. Here.</h2>
                    </header>
                    <div className="formgrid body-element">
                        <Form className="login-form" onSubmit={this.handleLogin}>
                            <Form.Group>
                                <h4>Login</h4>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control onChange={this.handleFieldChange} type="email"
                                        id="email"
                                        placeholder="Email address"
                                        required="" autoFocus="" />
                                </InputGroup>


                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="basic-addon1"><img width="15" src={require('./baseline_lock_black_18dp.png')}></img></InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control onChange={this.handleFieldChange} type="password"
                                        id="password"
                                        placeholder="Password"
                                        required="" />
                                </InputGroup>

                                <Button variant="primary" type="submit">
                                    Log In
                         </Button>
                                <Link className="nav-link" to="/Register">Don't have an account? Click here to sign up!</Link>

                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </>
        )
    }

}

export default LogIn