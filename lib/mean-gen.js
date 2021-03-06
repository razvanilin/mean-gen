require("shelljs/global");
var argv = require('minimist')(process.argv.slice(2));
var util = require('util');
var settings = require('./settings');
console.log(settings.project_user);
var git, npmServer, npmClient, bower;
var gitPath;

var spawn = require('child_process').spawn;

// check if git is installed
if (!which('git')) {
  echo('This generator requires Git. Please install it and then try again.');
  exit(1);
}

// check if bower is installed
if (!which('bower')) {
  echo('This generator requires Bower. Please install it and then try again (npm install -g bower)');
  exit(1);
}

// check the arguments list
if (argv.p == settings.project_user_flag) {
  gitPath = settings.project_user;
  console.log("Generating a modular MEAN stack application with a User login...");

} else if (argv.p == settings.project_simple_flag) {
  gitPath = settings.project_simple;
  console.log("Generating an empty modular MEAN stack application...");

} else {
  console.log("Use < mean-gen -p simple > to generate a simple project.");
  console.log("Use < mean-gen -p user > to generate a project with basic user login.");
  exit(1);
}

gitClone();

function gitClone() {
  // git clone the selected project
  git = spawn('git', ['clone', gitPath, '.']);

  git.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  git.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  git.on('exit', function(code) {
    console.log('Child process exited with code: ' + code);
    setupServer();
  });
}

//git('clone', 'https://github.com/razvanilin/mean-gen-example.git');
function setupServer() {
  cd('server');

  npmServer = spawn('npm', ['install']);
  console.log("Installing server dependencies...");

  npmServer.stdout.on('data', function(data) {
    console.log("stdout: " + data);
  });
  npmServer.stderr.on('data', function(data) {
    console.log("stderr: " + data);
  });
  npmServer.on('exit', function(code) {
    console.log('Child process exited with code: ' + code);
    setupClientNode();
  });
}

function setupClientNode() {
  cd('../client');
  npmClient = spawn('npm', ['install']);
  console.log("Installing client side node dependencies. This might take a while. Tea? Coffee?");

  npmClient.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  npmClient.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  npmClient.on('exit', function(code) {
    console.log('Child process exited with code: ' + code);
    setupClientBower();
  });
}

function setupClientBower() {

  bower = spawn('bower', ['install']);
  console.log("Installing bower dependencies...");

  bower.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  bower.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  bower.on('exit', function(code) {
    console.log('Child process exited with code: ' + code);
    displayWarnings();
    console.log('Your project was generated. Time to play now!');
  });
}


function displayWarnings() {
  // warning messages
  if (!which('grunt')) {
    echo('Warning! The project will require the grunt cli for the development. (npm install -g grunt-cli)');
  }
  if (!which('mongod') || !which('mongo')) {
    echo('Warning! MongoDB was not detected on your PATH.');
  }
}
