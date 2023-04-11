"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.requestV = exports.request = void 0;
var axios_1 = require("axios");
var utils_1 = require("./");
var api_host = (0, utils_1.getConfig)().FEISHU_CONFIG.api_host;
var request = function (url, option) {
    if (option === void 0) { option = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                return [2 /*return*/, axios_1["default"].request(__assign({ url: url }, option))];
            }
            catch (error) {
                throw new Error(error);
            }
            return [2 /*return*/];
        });
    });
};
exports.request = request;
/**
 * @description: 带 version 的通用 api 请求
 */
var requestV = function (_a) {
    var url = _a.url, _b = _a.method, method = _b === void 0 ? 'GET' : _b, _c = _a.headers, headers = _c === void 0 ? {} : _c, _d = _a.params, params = _d === void 0 ? {} : _d, _e = _a.query, query = _e === void 0 ? {} : _e;
    return __awaiter(void 0, void 0, void 0, function () {
        var sendUrl;
        return __generator(this, function (_f) {
            sendUrl = '';
            if (/^(http:\/\/|https:\/\/)/.test(url)) {
                sendUrl = url;
            }
            else {
                sendUrl = "".concat(api_host).concat(url);
            }
            try {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axios_1["default"]
                            .request({
                            url: sendUrl,
                            method: method,
                            headers: headers,
                            params: query,
                            data: __assign({}, params)
                        })
                            .then(function (_a) {
                            var data = _a.data, status = _a.status;
                            resolve({ data: data, code: status });
                        })["catch"](function (error) {
                            reject(error);
                        });
                    })];
            }
            catch (error) {
                throw new Error(error);
            }
            return [2 /*return*/];
        });
    });
};
exports.requestV = requestV;
