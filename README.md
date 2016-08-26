changed
![](https://codeship.com/projects/f1772310-3f6b-0134-faee-72bb3d175f42/status?branch=master)

# Youtube Search

### Tech stack
- React
- Redux
- Google API v3
- Mocha + Chai + Sinon + Casper (for testing)
- Istanbul + Isparta (coverage report)

### Usage
Basic are:
- `npm start`: Will start up the dev webserver
- `npm test`: Run unit tests
- `npm run test:e2e`: Run end to end tests
- `npm run coverage`: Run generate coverage report
- `npm run dist`: Create the packed version
- `npm run deploy-staging`: Deploy to Firebase staging app (requires provide FIREBASE_TOKEN env variable)
- `npm run deploy-qa`: Deploy to Firebase QA app (requires provide FIREBASE_TOKEN env variable)
