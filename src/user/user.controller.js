"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var business_exception_1 = require("../common/exceptions/business.exception");
var UserController = /** @class */ (function () {
    function UserController(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    UserController.prototype.create = function (createUserDto) {
        return this.userService.create(createUserDto);
    };
    UserController.prototype.findAll = function () {
        return this.userService.findAll();
    };
    UserController.prototype.findOne = function (id) {
        return this.userService.findOne(+id);
    };
    UserController.prototype.update = function (id, updateUserDto) {
        return this.userService.update(+id, updateUserDto);
    };
    UserController.prototype.remove = function (id) {
        return this.userService.remove(+id);
    };
    UserController.prototype.findError = function () {
        var a = {};
        console.log(a.b.c);
        return this.userService.findAll();
    };
    UserController.prototype.findBusinessError = function () {
        var a = {};
        try {
            console.log(a.b.c);
        }
        catch (error) {
            throw new business_exception_1.BusinessException('你这个参数错了');
        }
        return this.userService.findAll();
    };
    UserController.prototype.getTestName = function () {
        console.log(this.configService.get('TEST_VALUE'));
        return this.configService.get('TEST_VALUE').name;
    };
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Get)(),
        (0, common_1.Version)('1')
    ], UserController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "remove");
    __decorate([
        (0, common_1.Get)('findError'),
        (0, common_1.Version)([common_1.VERSION_NEUTRAL, '1'])
    ], UserController.prototype, "findError");
    __decorate([
        (0, common_1.Get)('findBusinessError'),
        (0, common_1.Version)([common_1.VERSION_NEUTRAL, '1'])
    ], UserController.prototype, "findBusinessError");
    __decorate([
        (0, common_1.Get)('getTestName')
    ], UserController.prototype, "getTestName");
    UserController = __decorate([
        (0, common_1.Controller)({
            version: '1',
            path: 'user'
        })
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
