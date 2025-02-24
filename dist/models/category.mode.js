"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var categorySchema = new mongoose_1.default.Schema({
    title: String,
    avatar: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date,
}, {
    timestamps: true
});
var Caterory = mongoose_1.default.model("Caterory", categorySchema, "categories");
exports.default = Caterory;
