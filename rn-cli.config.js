/* https://github.com/facebook/metro/issues/1 */

const path = require('path');
const fs = require('fs');

let blacklist;
try {
  blacklist = require('metro-bundler/src/blacklist');
} catch(e) {
  blacklist = require('metro/src/blacklist');
}

const moduleBlacklist = [
  //Add whatever you need to the blacklist for your project
  /node_modules[^\/]+\/.*/
];

const baseModulePath = path.resolve(__dirname, 'node_modules'),
      baseModules = fs.readdirSync(baseModulePath);

function getSymlinkedModules() {
  var alternateRoots = [];

  for (var i = 0, il = baseModules.length; i < il; i++) {
    var file = baseModules[i];
    if (file.charAt(0) === '.')
      continue;

    var fullFile = path.join(baseModulePath, file),
        stats = fs.lstatSync(fullFile);

    if (stats.isSymbolicLink()) {
      var realPath = fs.realpathSync(fullFile);
      if (realPath.substring(0, (__dirname).length) !== __dirname)
        alternateRoots.push(realPath);
    }
  }

  return alternateRoots;
}

function getExtraModulesForAlternateRoot(fullPath) {
  var packagePath = path.join(fullPath, 'package.json'),
      packageJSON = require(packagePath),
      alternateModules = [].concat(Object.keys(packageJSON.dependencies || {}), Object.keys(packageJSON.devDependencies || {}), Object.keys(packageJSON.peerDependencies || {})),
      extraModules = {};

  for (var i = 0, il = alternateModules.length; i < il; i++) {
    var moduleName = alternateModules[i];
    extraModules[moduleName] = path.join(baseModulePath, moduleName);
  }

  return extraModules;
}

//alternate roots (outside of project root)
var alternateRoots = getSymlinkedModules(),
//resolve external package dependencies by forcing them to look into path.join(__dirname, "node_modules")
    extraNodeModules = alternateRoots.reduce((obj, item) => {
      Object.assign(obj, getExtraModulesForAlternateRoot(item));
      return obj;
    }, {});

module.exports = {
  getBlacklistRE: function() {
    return blacklist(moduleBlacklist);
  },
  getProjectRoots() {
    return [
      // Keep your project directory.
      path.resolve(__dirname)
    ].concat(alternateRoots);
  },
  extraNodeModules
};
