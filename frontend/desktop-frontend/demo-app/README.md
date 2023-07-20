# demo-app Readme

This app combines electron and react to create a portable desktop app.
Folders: 
  build: React's build folder. Stores the static website built by react from the website skeleton in 'public' and the react code in 'src'.
  public: The basic website skeleton minus any fancy react code. Can edit the website header and format here.
  src: React's source code, including App.js (for the react app) and index.js (which modifies index.html from public to add the react app)
  node_modules: The node.js libraries used in this project. Managed by npm, no need for manual editing
  dist: Electron's build folder. Contains packaged versions of all relevant files, plus compiled executables and installer scripts and so forth. Managed by electron-builder

Files:
  .gitignore: ignores build, dist, and node_modules, among other things
  main.js: Entry script for Electron (as pointed to by package.json)
  package.json: contains importants config info. Manually edit this script to do different things
  package-lock.json: A utility file for npm. Managed automatically.
  preload.js: The bridging script that gets preloaded by Electron's renderer processes, allowing them to talk to the main process. React code can use its features, just be careful about imports
  README.md: this file

## Notes on editing package.json and making electron compile properly

The three big fields to set are "main", "homepage", and "build". The "main" field should point to your electron entry script, in this case main.js. The "homepage" field should point to "./" if you want project paths relative and not absolute in your built react site. Important for Electron (I think), or if your web root is not the site folder. The "build" field is very important. In the "files" list subentry, include all of your electron app scripts, plus the build folder and any other necessary resources, as written in file paths relative to the project root. If you don't use this, it defaults to "**/*", which takes all files in all subdirectories and (I think) flattens them out into one packaged directory, which ruins your include structure in the code.

TODO:
 - Investigate using typescript for development
 - Improve design of index.html (figure out how best to show things in beta version)
 - Figure out public medical APIs and find test datasets you can use to demonstrate the app
 - (Slack goals)
 - Tidy up project: figure out digital signatures, copywrite and insert spec details, and so forth
 - Boilerplate to look at and take inspiration from: https://github.com/electron-react-boilerplate/electron-react-boilerplate/blob/main/package.json 
 - Check out ESlint and other code productivity tools
 - *Schedule time to brush up on "code smells" and other design best practices (https://refactoring.guru/smells/primitive-obsession and other sites)
 - Schedule time to develop *Organizational Standards* of coding (look at those of other organizations, e.g., the prof who emailed you)
 - Schedule time to read and try to develop for c/c++ open source projects just to refresh your C skillz
 - Figure out how to use code analysis tools (make list of tools to learn and spend 5 mins a day reading about them and slowly integrating them into workflow)
 - https://fsharpforfunandprofit.com/fppatterns/    EXCELLENT presentation


(Below this are the original contents of create-react-app's readme).


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
