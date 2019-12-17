import React, { Component } from 'react'
import "./Home.css"

class Home extends Component {
    render() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        return (
            <>
                 <header>
                    {/* <img src={require('')} width="330" height="150" alt="Hapi Logo" /> */}
                    <h2><span>Filler. Text. Here.</span></h2>
                </header> 
                <section className="section-content welcome-message">
                    <div>Hello, {currentUser.firstName}! Welcome to Hapi!</div>
                    <h3>Have you ever come across a resource that would be great to use in a future project, but when you finally get to where you want to use that resource, you can't because you either wrote it down and lost the note, or you simply forgot the name of the technology? Would you like a way to keep track of these technologies when you find them, so that you can use them later on down the road? If you answered yes, look no futher than HAPI. The Hapi App eliminates these issues by giving users a central place to log the technologies that they might possibly want to use in future projects.</h3>
                    <h2>What does Hapi offer?</h2>
                    <h3>Hapi is a React App that was designed for software developers to use to keep track of APIs that they would like to use in future projects. This app gives users the ability to search through a list of public APIs and save any API from their search to their favorites list. It also allows users to keep track of all of their ERDs as well by saving links to them in their favorites list.</h3>
                </section>
            </>
        )
    }
}


export default Home;