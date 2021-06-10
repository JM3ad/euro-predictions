# Socketry frontend
Typescript/react project hosted through github pages

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
### First time
`npm install`

### Dev
`npm start`

### Test
`npm test`

### Environment variables
If you want to override locally, copy the .env file and rename the copy to .env.local; set any variables there.
Remember to prefix with `REACT_APP_`

### Deploy
* Automatic on push to main
* Manually: `npm run predeploy && npm run deploy`
* Page is currently accessible at: https://jm3ad.github.io/hosted-react-app/

## Using this as a template
Create a new repository using this one as the template
By default, you should adjust:
* In `package.json`, the name & homepage
* In `404.html` adjust the redirect URL
* In `.env`, the REACT_APP_BASE_URL variable