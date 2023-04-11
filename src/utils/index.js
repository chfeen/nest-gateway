"use strict";
exports.__esModule = true;
exports.getConfig = exports.getEnv = void 0;
// 添加读取yaml的方法
var yaml_1 = require("yaml");
var path = require("path");
var fs = require("fs");
var getEnv = function () {
    return process.env.RUNNING_ENV || 'dev';
};
exports.getEnv = getEnv;
var getConfig = function () {
    var environment = (0, exports.getEnv)();
    var yamlPath = path.join(process.cwd(), "./.config/.".concat(environment, ".yaml"));
    var file = fs.readFileSync(yamlPath, 'utf8');
    return (0, yaml_1.parse)(file);
};
exports.getConfig = getConfig;
