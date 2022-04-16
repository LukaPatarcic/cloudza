"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        while (_) try {
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
exports.EmailVerificationRepository = void 0;
var common_1 = require("@nestjs/common");
var email_verification_entity_1 = require("@feature/auth/entity/email-verification.entity");
var user_repository_1 = require("@feature/user/user.repository");
var common_helper_1 = require("@helper/common.helper");
var typeorm_1 = require("typeorm");
var EmailVerificationRepository = /** @class */ (function (_super) {
    __extends(EmailVerificationRepository, _super);
    function EmailVerificationRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailVerificationRepository.prototype.findByToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var emailVerification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne({
                            token: token
                        })];
                    case 1:
                        emailVerification = _a.sent();
                        if (!emailVerification) {
                            throw new common_1.HttpException('LOGIN.EMAIL_CODE_NOT_VALID', common_1.HttpStatus.FORBIDDEN);
                        }
                        return [2 /*return*/, emailVerification];
                }
            });
        });
    };
    EmailVerificationRepository.prototype.createEmailToken = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, user, emailVerification, token, newEmailVerification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userRepository = this.manager.getCustomRepository(user_repository_1.UserRepository);
                        return [4 /*yield*/, userRepository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.findOne({ user: user })];
                    case 2:
                        emailVerification = _a.sent();
                        if (common_helper_1.CommonHelper.timeIsLessThan15Minutes(emailVerification === null || emailVerification === void 0 ? void 0 : emailVerification.updated_at.getTime())) {
                            throw new common_1.HttpException('LOGIN.EMAIL_SENT_RECENTLY', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
                        }
                        return [4 /*yield*/, this.generateEmailToken()];
                    case 3:
                        token = _a.sent();
                        if (!!emailVerification) return [3 /*break*/, 5];
                        newEmailVerification = new email_verification_entity_1.EmailVerification(token, user);
                        return [4 /*yield*/, newEmailVerification.save()];
                    case 4:
                        _a.sent();
                        user.emailVerification = newEmailVerification;
                        return [2 /*return*/, user];
                    case 5:
                        emailVerification.token = token;
                        return [4 /*yield*/, emailVerification.save()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    EmailVerificationRepository.prototype.generateEmailToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var token, existsInDb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = common_helper_1.CommonHelper.generateToken();
                        return [4 /*yield*/, this.findOne({ token: token })];
                    case 1:
                        existsInDb = _a.sent();
                        if (existsInDb) {
                            this.generateEmailToken();
                        }
                        return [2 /*return*/, token];
                }
            });
        });
    };
    EmailVerificationRepository = __decorate([
        (0, typeorm_1.EntityRepository)(email_verification_entity_1.EmailVerification)
    ], EmailVerificationRepository);
    return EmailVerificationRepository;
}(typeorm_1.Repository));
exports.EmailVerificationRepository = EmailVerificationRepository;
