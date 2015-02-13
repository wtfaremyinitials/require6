var path = require('path');
var to5  = require('6to5');

module.exports = function(filename) {
    var filepath = path.dirname(filename);

    return function(modPath) {
        modPath    = filepath + path.sep + path.normalize(modPath);
        var modDir = path.dirname(modPath);

        var newModule = new Function('exports', 'require', 'module', '__filename', '__dirname', to5.transformFileSync(modPath).code);
        var moduleObj = { exports: {} };

        newModule(moduleObj.exports, require, moduleObj, modPath, modDir);

        return moduleObj.exports;
    };
};
