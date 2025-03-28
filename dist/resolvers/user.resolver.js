"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolversUser = void 0;
var generate_helper_1 = require("../helpers/generate.helper");
var user_model_1 = __importDefault(require("../models/user.model"));
var md5_1 = __importDefault(require("md5"));
exports.resolversUser = {
    Query: {
        getUser: function (_, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var id, token, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = args.id;
                        token = context.req.token;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                token: token,
                                deleted: false,
                            })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, {
                                    code: 200,
                                    message: "Get User Successfull!",
                                    id: user.id,
                                    fullName: user.fullName,
                                    email: user.email,
                                    token: user.token
                                }];
                        }
                        return [2 /*return*/, {
                                code: 400,
                                message: "Get User Fail!"
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 3: return [2 /*return*/];
                }
            });
        }); }
    },
    Mutation: {
        register: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var user, exitUser, record, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = args.user;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: user.email,
                                deleted: false,
                            })];
                    case 1:
                        exitUser = _a.sent();
                        if (!exitUser) return [3 /*break*/, 2];
                        return [2 /*return*/, {
                                code: 400,
                                message: "Account already exists!"
                            }];
                    case 2:
                        user.password = (0, md5_1.default)(user.password);
                        user.token = (0, generate_helper_1.generateRandomString)(30);
                        record = new user_model_1.default(user);
                        return [4 /*yield*/, record.save()];
                    case 3:
                        data = _a.sent();
                        console.log(data.password);
                        return [2 /*return*/, {
                                code: 200,
                                message: "Register Successful!",
                                id: data.id,
                                fullName: data.fullName,
                                email: data.email,
                                token: data.token,
                            }];
                }
            });
        }); },
        login: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var user, infoUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = args.user;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: user.email,
                                deleted: false,
                            })];
                    case 1:
                        infoUser = _a.sent();
                        if (!infoUser) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: "Account does not exist!"
                                }];
                        }
                        if (infoUser.password != (0, md5_1.default)(user.password)) {
                            return [2 /*return*/, {
                                    code: 400,
                                    message: "Wrong password!"
                                }];
                        }
                        return [2 /*return*/, {
                                code: 200,
                                message: "Login Successfull!",
                                id: infoUser.id,
                                fullName: infoUser.fullName,
                                email: infoUser.email,
                                token: infoUser.token
                            }];
                }
            });
        }); }
    }
};
