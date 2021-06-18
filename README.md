# weather-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Backend Setup

Backend and Frontend should be running. You can get your API key at [openweathermap.org/api](https://openweathermap.org/api)

- After getting your API key, rename `.env.copy` to `.env` and replace the `YOUR_API_KEY_HERE` with your own API key.

### Install Dependencies
- `cd backend` , then install dotenv:
```
npm install dotenv
```
- install express js:
```
npm install express
```
- For express, by default with version npm 5.0+ npm install adds the module to the dependencies list in the package.json file; with earlier versions of npm, you must specify the --save option explicitly.

- install querystring:
```
npm install qs
```
- finally, install fetch (you can also use axios instead of fetch):
```
npm install node-fetch
```
- Run the project:
```
npm run serve
cd backend
nodemon index.js
```