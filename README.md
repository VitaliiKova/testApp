# Test backend project

Test backend project contains API requests, swagger documentation, e2e, unit and integration tests. 

Technologies:
- TypeScript as a language; 

- Jest as test framework/runner;


## How to run a project locally

1) Download LTS version of [Node JS](https://nodejs.org/en/download/) from official site

2) Open the project folder on your computer using IDE (for example [Web Storm](https://www.jetbrains.com/webstorm/))

3) The project contains a "package.json" file that contains a list of all required libraries and dependencies. To install them all, enter the command "npm install" in the terminal

4) To start the project you need to execute the command "npm run start" in the terminal, when the server starts successfully you will see the following message  "Running on port 5000" in the terminal
```bash
npm run start
```

## Usage API
The test project allows you to make a request to get list with all github repositories for user by github user name, which are not forks.

To view the route and its input / output data, follow the link to the swagger documentation [http://localhost:5000/api-docs/](http://localhost:5000/api-docs/)

On the swagger documentation page you can run routes in real time and observe the result when entering different input data.

Basic requirements of the request:

1) The main request to get all the repositories is as follows: "http://localhost:5000/repositories/{accountType}/{userName}"
2) Github API has a limit on the number of requests.
   - For an unauthorized user - 60 per hour
   - For an authorized user - 5000 per hour
   
    So you can send your OAuth2 token from your github account as {header “Authorization: #########”} to make authorized requests.
    You can create your OAuth2 token by following the link https://github.com/settings/tokens
3) You can get user or organization repositories, given into {accountType} parameter "users" or "orgs" 
4) Given {accountType}, {userName}, {header “Accept: application/json”}, you will get all github repositories, which are not forks and for each branch it’s name and last commit sha.
5) Given not existing github username, you will get 404 response
6) Given {header “Accept: application/xml”}, you will get 406 response


## E2E, Unit and Integration tests
All the main functionality of the project is covered by tests.

To run all tests with cover information, run the following command in the terminal "npm run test:all"
```bash
npm run test:all
```
To run E2E tests, run the following command in the terminal "npm run test:e2e"
```bash
npm run test:e2e
```
To run Integration tests, run the following command in the terminal "npm run test:int"
```bash
npm run test:int
```
To run Unit tests, run the following command in the terminal "npm run test:unit"
```bash
npm run test:unit
```
## License
[MIT](https://choosealicense.com/licenses/mit/)