var path  = require('path');
var babel = require('babel');

module.exports = function(filename, options) {
    if(!options)
        options = {};

    var filepath = path.dirname(filename);

    return function(modPath) {
        modPath    = filepath + path.sep + path.normalize(modPath);
        var modDir = path.dirname(modPath);

        options.filename = modPath;

        var newModule = new Function('exports', 'require', 'module', '__filename', '__dirname', babel.transformFileSync(modPath, options).code);
        var moduleObj = { exports: {} };

        newModule(moduleObj.exports, require, moduleObj, modPath, modDir);

        return moduleObj.exports;
    };
};
