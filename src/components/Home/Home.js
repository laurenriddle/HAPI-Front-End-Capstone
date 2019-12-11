import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'


class Home extends Component {
    render() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        return (
            <>
                <section className="section-content">
                    <h1>Hello, {currentUser.firstName}! Welcome to Hapi!</h1>
                </section>
            </>
        )
    }
}


export default Home;