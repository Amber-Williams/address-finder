# Address finder

## start up locally
*note: project is run on node v15.11.0 and yarn version v1.22.4*
1. Install project dependencies running `yarn` in root directory 
2. create an .env file with the following outline:
```
# server
ADDRESS_API_KEY=################################
PORT=3000

# client
REACT_APP_SERVER_URL=http://localhost:3000
```
3. Start api server running `cd api && node server.js` 
4. In the root directory run `yarn start` to run the client server then enter `y` to tell the client server to run on a different port from the api server

& enjoy!


## Client server commands
### `yarn start`
Runs the app in the development mode.<br />

### `yarn test`
Launches the test runner in the interactive watch mode.<br />

### `yarn build`
Builds the app for production to the `build` folder.<br />

### `yarn eject`
**Note: this is a one-way operation. Once you `eject`, you can’t go back!**
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.