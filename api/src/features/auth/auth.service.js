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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var auth_repository_1 = require("@feature/auth/repository/auth.repository");
var email_verification_repository_1 = require("@feature/auth/repository/email-verification.repository");
var forgotten_password_repository_1 = require("@feature/auth/repository/forgotten-password.repository");
var user_repository_1 = require("@feature/user/user.repository");
var response_dto_1 = require("../../core/dto/response.dto");
var AuthService = /** @class */ (function () {
    function AuthService(authRepository, userRepository, emailVerificationRepository, forgottenPasswordRepository, jwtService, mailService) {
        this.authRepository = authRepository;
        this.userRepository = userRepository;
        this.emailVerificationRepository = emailVerificationRepository;
        this.forgottenPasswordRepository = forgottenPasswordRepository;
        this.jwtService = jwtService;
        this.mailService = mailService;
    }
    AuthService.prototype.signUp = function (signUpDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authRepository.signUp(signUpDto)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.sendEmailVerification(user.email)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.signIn = function (signInDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, payload, accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.authRepository.validateUserPassword(signInDto)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.UnauthorizedException('Invalid credentials');
                        }
                        if (!user.isEmailVerified) {
                            throw new common_1.BadRequestException('Please verify email before logging in');
                        }
                        payload = { id: user.id, email: user.email };
                        accessToken = this.jwtService.sign(payload);
                        return [2 /*return*/, __assign({ accessToken: accessToken }, payload)];
                }
            });
        });
    };
    AuthService.prototype.verifyEmail = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var emailVerification, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerificationRepository.findByToken(token)];
                    case 1:
                        emailVerification = _a.sent();
                        user = emailVerification.user;
                        user.isEmailVerified = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, emailVerification.remove()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, !!user];
                }
            });
        });
    };
    AuthService.prototype.sendEmailVerification = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, sent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.emailVerificationRepository.createEmailToken(email)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.mailService.sendVerificationEmail(user.email, user.name, user.emailVerification.token)];
                    case 2:
                        sent = _a.sent();
                        return [2 /*return*/, sent];
                }
            });
        });
    };
    AuthService.prototype.sendEmailForgotPassword = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, forgottenPassword, sent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.forgottenPasswordRepository.createForgottenPasswordToken(email)];
                    case 1:
                        user = _a.sent();
                        forgottenPassword = user.forgottenPassword;
                        return [4 /*yield*/, this.mailService.sendPasswordResetEmail(user.email, user.name, forgottenPassword.token)];
                    case 2:
                        sent = _a.sent();
                        return [2 /*return*/, sent];
                }
            });
        });
    };
    AuthService.prototype.setNewPassword = function (resetPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var isNewPasswordChanged, email, currentPassword, isValidPassword, forgottenPasswordModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isNewPasswordChanged = false;
                        email = resetPassword.email, currentPassword = resetPassword.currentPassword;
                        if (!(resetPassword.email && resetPassword.currentPassword)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.authRepository.validateUserPassword({
                                email: email,
                                password: currentPassword
                            })];
                    case 1:
                        isValidPassword = _a.sent();
                        if (!isValidPassword) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.authRepository.setPassword(resetPassword.email, resetPassword.newPassword)];
                    case 2:
                        isNewPasswordChanged = _a.sent();
                        return [3 /*break*/, 4];
                    case 3: return [2 /*return*/, new response_dto_1.ResponseError('RESET_PASSWORD.WRONG_CURRENT_PASSWORD')];
                    case 4: return [3 /*break*/, 11];
                    case 5:
                        if (!resetPassword.newPasswordToken) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.forgottenPasswordRepository.findByToken(resetPassword.newPasswordToken)];
                    case 6:
                        forgottenPasswordModel = _a.sent();
                        return [4 /*yield*/, this.authRepository.setPassword(forgottenPasswordModel.user.email, resetPassword.newPassword)];
                    case 7:
                        isNewPasswordChanged = _a.sent();
                        if (!isNewPasswordChanged) return [3 /*break*/, 9];
                        return [4 /*yield*/, forgottenPasswordModel.remove()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, new response_dto_1.ResponseError('RESET_PASSWORD.CHANGE_PASSWORD_ERROR')];
                    case 11: return [2 /*return*/, new response_dto_1.ResponseSuccess('RESET_PASSWORD.PASSWORD_CHANGED', isNewPasswordChanged)];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(auth_repository_1.AuthRepository)),
        __param(1, (0, typeorm_1.InjectRepository)(user_repository_1.UserRepository)),
        __param(2, (0, typeorm_1.InjectRepository)(email_verification_repository_1.EmailVerificationRepository)),
        __param(3, (0, typeorm_1.InjectRepository)(forgotten_password_repository_1.ForgottenPasswordRepository))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
