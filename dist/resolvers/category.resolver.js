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
exports.resolversCategory = void 0;
var category_mode_1 = __importDefault(require("../models/category.mode"));
exports.resolversCategory = {
    Query: {
        getListCategory: function () { return __awaiter(void 0, void 0, void 0, function () {
            var categorys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, category_mode_1.default.find({
                            deleted: false
                        })];
                    case 1:
                        categorys = _a.sent();
                        return [2 /*return*/, categorys];
                }
            });
        }); },
        getCategory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var id, category, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, category_mode_1.default.findOne({
                                _id: id,
                                deleted: false,
                            })];
                    case 2:
                        category = _a.sent();
                        return [2 /*return*/, category];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 4: return [2 /*return*/];
                }
            });
        }); }
    },
    Mutation: {
        createCategory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var category, record;
            return __generator(this, function (_a) {
                category = args.category;
                record = new category_mode_1.default(category);
                record.save();
                return [2 /*return*/, record];
            });
        }); },
        deleteCategory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var id, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, category_mode_1.default.updateOne({
                                _id: id,
                                deleted: false,
                            }, {
                                deleted: true
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "This Category is deleted!"];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, error_2];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
        updateCategory: function (_, args) { return __awaiter(void 0, void 0, void 0, function () {
            var id, category, record, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = args.id, category = args.category;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, category_mode_1.default.updateOne({
                                _id: id,
                                deleted: false,
                            }, category)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, category_mode_1.default.findOne({
                                _id: id,
                                deleted: false,
                            })];
                    case 3:
                        record = _a.sent();
                        return [2 /*return*/, record];
                    case 4:
                        error_3 = _a.sent();
                        return [2 /*return*/, error_3];
                    case 5: return [2 /*return*/];
                }
            });
        }); },
    }
};
