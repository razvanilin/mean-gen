require("shelljs/global");
var sys = require('sys')
var exec = require('child_process').exec;
var git, npm1, npm2, bower;

if (!which('git')) {
  echo('This generator requires Git. Please install it and then try again.');
  exit(1);
}

if (!which('bower')) {
  echo('This generator requires Bower. Please install it and then try again (npm install -g bower)');
  exit(1);
}

git = exec("git clone https://github.com/razvanilin/mean-gen-example.git .", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
    exit(1);
  }

  setupServer();
});

//git('clone', 'https://github.com/razvanilin/mean-gen-example.git');
function setupServer() {
  cd('server');

  npm1 = exec("npm install", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      exit(1);
    }

    setupClientNode();
  });
}

function setupClientNode() {
  cd('../client');

  npm2 = exec("npm install", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      exit(1);
    }

    setupClientBower();
  });
}

function setupClientBower() {
  bower = exec("bower install", function (error, stdout, stderr) {
    sys.print('stdout: ' + stdout);
    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      exit(1);
    }
  });
}
// warning messages
if (!which('grunt')) {
  echo('Warning! The project will require the grunt cli for the development. (npm install -g grunt-cli)');
}
if (!which('mongod') || !which('mongo')) {
  echo('Warning! MongoDB was not detected on your PATH.');
}
