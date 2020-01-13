# Welcome to Hapi! 
Have you ever been working on a project and found yourself spending a huge amount of time navigating to several different places over and over again to find technology documentation, the project github account, wireframes, or entity relationship diagrams? Would you like a way to keep the resources and documentation for your project in one place so that they are quickly accessible? If you answered yes, look no futher than HAPI.

## What does Hapi offer?
Hapi is a single page, React App that was designed to give software developers a means to keep track of the APIs, ERDs, Wireframes, Technologies, documentation, and notes that they are using in specific projects so that these resources are easily accessible in one central place. With Hapi, users have the ability to create project boards and log APIs, ERDs, Wireframes, and Technologies under the different projects that they are working on. This app also gives users the ability to search through a list of public APIs and save any API from their search to one of their project boards.


## Want to use Hapi? Follow the instructions bellow to run the application.

1. Clone down this repository by clicking the "Clone or Download" button above, copying the SSH key, and running the following command in your terminal `git clone SSH KEY GOES HERE`.
1. `cd` into the root directory of the app.
1. Run `npm install` and wait for all dependencies to be installed.
1. `cd` into /src/modules and open Credentials.js.example.
1. You must sign up for a Cloudinary account and get your own Cloudname and Upload preset to use the image upload functionality in the Hapi app. Once you have these, put them into the appropriate spot in the Credentials.js.example file.
1. Remove the .example from the Credentials.js.example file.
1. Run `npm start` to verify that installation was successful and start the application.
1. `cd` into the /api directory, and remove the .example extention from the database.json.example file. 
1. In the api folder, run `json-server -p 5002 -w database.json`.
1. Go to http://localhost:3000/ to view the app. 

## Tech Stack
1. React
1. HTML
1. CSS 
1. Javascript
1. Cloudinary 
1. JSX
1. React Bootstrap 
1. Public API for Public APIs 
1. json-server 
![ Logo ](./HapiLogoRobot.png)
