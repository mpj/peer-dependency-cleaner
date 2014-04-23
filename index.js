#!/usr/bin/env node
var exec = require('child_process').exec

var firstArgument = process.argv[2];
var moduleName = firstArgument;

if (!moduleName) {
  console.warn("First argument should be the name of the module that you want to clean.")
  process.exit(1);
}

function runCommandLine(cmd, callback) {
  var child = exec(cmd, function (error, outputSuccess, outputError) {
    if (!!error) {
      callback(new Error(outputError))
    } else {
      callback(null, outputSuccess)
    }
  })
}

function moduleLevels(path) {
  var match = path.match(/node_modules/g)
  return !!match ? match.length : 0
}

var cmd =
  'find node_modules -name "' + moduleName + '" -type d -follow'

runCommandLine(cmd, function(error, resultString) {
  var resultArray = resultString.split(/\r?\n/);
  resultArray.forEach(function(directoryPath) {
    // Don't try to delete top level directories
    // (because thats the actual peerdeps that we
    // want to have remeain)
    // or invalid paths
    if (moduleLevels(directoryPath) <= 1) return;

    runCommandLine('rm -rf ' + directoryPath, function(error) {
      if (error) console.warn("Error deleting directory:", error)
    })

  })

})
