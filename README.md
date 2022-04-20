## Preamble

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
I didn't use any style systems on this project for excluding using 3rd libraries.
In general: it's just the base of the Select component with auto-complete, it can be really better with additional 1-2 days of work, because was missed some parts like:

- outside click event for closing dropdown
- multiselect
- supporting label for the Select, icons, infinity load, and other
- tests
- better realization for styles

## Demo

You can open demo on [github pages](https://art-smi.github.io/deel-test-task-auto-complete).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `yarn deploy`

Runs the process of creating build and deploy to github pages

### `yarn predeploy`

Runs the process of creating build. Uses from `yarn deploy`
