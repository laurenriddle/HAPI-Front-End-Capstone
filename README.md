# Welcome to Hapi 
Have you ever come across a resource that would be great to use in a future project, but when you finally get to where you want to use that resource, you can't because you either wrote it down and lost the note, or you simply forgot the name of the technology? Would you like a way to keep track of these technologies when you find them, so that you can use them later on down the road? If you answered yes, look no futher than HAPI. The Hapi App eliminates these issues by giving users a central place to log the technologies that they might possibly want to use in future projects. 

## What Hapi Offers
Hapi is a React App that was designed for software developers to use to keep track of APIs that they would like to use in future projects. This app gives users the ability to search through a list of public APIs and save any API from their search to their favorites list. It also allows users to keep track of all of their ERDs as well by saving links to them in their favorites list. 

## Want to use Hapi? Follow the instructions bellow to run the application.

1. Clone down this repository by clicking the "Clone or Download" button above, copying the SSH key, and running the following command in your terminal `git clone SSH KEY GOES HERE`.
1. `cd` into the root directory of the app.
1. Run `npm install` and wait for all dependencies to be installed.
1. Run `npm start` to verify that installation was successful and start the application.
1. In the root directory, run `mkdir api`. Then run `touch api/database.json`.
1. `cd` into the api directory, and run `json-server -p 5002 -w database.json`.
1. Go to http://localhost:3000/ to view the app. 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


![ Logo ](./Logo.png)


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
