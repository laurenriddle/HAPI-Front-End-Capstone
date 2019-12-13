import React, { Component } from "react"
import APIManager from "../../modules/APIManager"
import { Link } from "react-router-dom"
import "./Login.css"


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
                <header>
                    <img src={require('../Nav/Logo.png')} width="330" height="150" alt="Hapi Logo" />
                    <h2><span>Filler. Text. Here.</span></h2>
                </header>
                <form onSubmit={this.handleLogin}>
                    <fieldset>
                        <h4>Login</h4>
                        <div className="formgrid">
                            <label htmlFor="inputEmail">Email address</label>
                            <input onChange={this.handleFieldChange} type="email"
                                id="email"
                                placeholder="Email address"
                                required="" autoFocus="" />

                            <label htmlFor="inputPassword">Password</label>
                            <input onChange={this.handleFieldChange} type="password"
                                id="password"
                                placeholder="Password"
                                required="" />
                        </div>
                        <button type="submit">
                            Log In
            </button>
                        <Link className="nav-link" to="/Register">Don't have an account? Click here to sign up!</Link>

                    </fieldset>
                </form>
            </>
        )
    }

}

export default LogIn