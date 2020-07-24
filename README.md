# udacityFinalTravelApp

The goal of this app is to use multiple APIs to display information about a user's travel destination including the likely weather based on historical data

I added a "remove trip" options as a way to extend the functionality of my project

## Installation and Development

Use the package manager [npm](https://www.npmjs.com/) to install dependenceies.

```bash
npm install
```

Run the following to build the project through webpack:

```bash
npm run build
```

run the following to spin up your local server and view the project in production mode
```bash
npm start
```

run the following at the same time as the previous command to enable hot loading and view the project in development mode
```bash
npm run dev
```

## Important Files

    -webpack.config.js file contains info for running webpack dev server and states requirements
    -package.json file contains scripts for running and testing with webpack and jest
    -src/js/app.js file contain all three API Keys used in the project and includes the function that queries them


### Dependencies

        -"body-parser": "1.19.0",
        -"cors": "2.8.5",
        -"dotenv": "^8.2.0",
        -"express": "4.17.1",
        -"node-sass": "^4.14.1"

### Dev Dependencies

        -"@babel/core": "^7.10.5",
        -"@babel/preset-env": "^7.10.4",
        -"babel-loader": "^8.1.0",
        -"clean-webpack-plugin": "^3.0.0",
        -"css-loader": "^3.6.0",
        -"file-loader": "^6.0.0",
        -"html-loader": "^1.1.0",
        -"html-webpack-plugin": "^4.3.0",
        -"jest": "^26.1.0",
        -"node-sass": "^4.14.1",
        -"sass": "^1.26.10",
        -"sass-loader": "^9.0.2",
        -"style-loader": "^1.2.1",
        -"webpack": "^4.43.0",
        -"webpack-cli": "^3.3.12",
        -"webpack-dev-server": "^3.11.0",
        -"workbox-webpack-plugin": "^5.1.3"

### References

Project is based off of a previous weatherjournal app found [here](https://github.com/aryamurthi/udacityWeatherJournalApp)
