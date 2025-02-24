"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
var article_typeDef_1 = require("./article.typeDef");
var category_typeDef_1 = require("./category.typeDef");
var user_typeDef_1 = require("./user.typeDef");
exports.typeDefs = [
    article_typeDef_1.typeDefsArticle,
    category_typeDef_1.typeDefsCategory,
    user_typeDef_1.typeDefsUser,
];
