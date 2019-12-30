import React, { Component } from 'react'
import "./Home.css"
import { Carousel, Button, Jumbotron } from 'react-bootstrap'

class Home extends Component {
    render() {
        const currentUser = JSON.parse(localStorage.getItem("credentials"))
        return (
            <>
                {/* <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            height="730px"
                            src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h3>Organize Your Projects</h3>
                            <p>Offering project organization tools for web developers.</p>
                            <Button onClick={()=> {this.props.history.push("/projects")}}>View Projects</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height="730px"
                            className="d-block w-100"
                            src="https://images.unsplash.com/photo-1485119584289-30ca2b38c67e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            height="730px"
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="First slide"
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel> */}
                    <Jumbotron className="HomeJumbo"> 
                    {/* <img
                            height="730px"
                            className="d-block w-100"
                            src="https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            alt="First slide"
                            /> */}
<h2>Hello, {currentUser.firstName}! Welcome to Hapi! Your project organization solution.</h2>
                    </Jumbotron>
                {/* <header> */}
                    {/* <img src={require('')} width="330" height="150" alt="Hapi Logo" /> */}
                    {/* <h2><span>Filler. Text. Here.</span></h2>
                </header>
                <section className="section-content welcome-message">
                    <div>Hello, {currentUser.firstName}! Welcome to Hapi!</div>
                    <h3>Have you ever come across a resource that would be great to use in a future project, but when you finally get to where you want to use that resource, you can't because you either wrote it down and lost the note, or you simply forgot the name of the technology? Would you like a way to keep track of these technologies when you find them, so that you can use them later on down the road? If you answered yes, look no futher than HAPI. The Hapi App eliminates these issues by giving users a central place to log the technologies that they might possibly want to use in future projects.</h3>
                    <h2>What does Hapi offer?</h2>
                    <h3>Hapi is a React App that was designed for software developers to use to keep track of APIs that they would like to use in future projects. This app gives users the ability to search through a list of public APIs and save any API from their search to their favorites list. It also allows users to keep track of all of their ERDs as well by saving links to them in their favorites list.</h3>
                </section> */}
            </>
        )
    }
}


export default Home;