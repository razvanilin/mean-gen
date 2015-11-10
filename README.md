# mean-gen
A modularized MEAN Stack generator that will enable your back-end NodeJs application to sit separately from your front-end Angular application

## Installation ##

`npm install -g mean-gen`

Install with `-g` in order to be able to use the `mean-gen` command in your console.

## Dependencies ##

Grunt CLI and Bower
`npm install -g grunt-cli bower`

MongoDB: https://www.mongodb.org/

Yeoman for easily creating routes in the angular application (not necessary)
`npm install -g yo generator-angular`

## Usage ##

```
mkdir project_name
cd project_name
mean-gen
```

This will download clone an existing copy of a skeleton application and install the local dependecies for you.
The cloned application will have basic User sign up, login and profile settings along with picture uploads.

**More customisation comming soon including a clean project**

## Run the application ##

* Start the MongoDB database

`mongod`

* Start the node server

```
cd project_name/server
node index
```

* Start grunt

```
cd project_name/client
grunt serve
```
