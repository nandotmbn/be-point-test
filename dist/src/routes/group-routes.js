"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var create_group_1 = __importDefault(require("../controllers/groups/create-group"));
var header_token_1 = __importDefault(require("../controllers/headers/header-token"));
var router = express_1.default.Router();
router.post("/group/register", [header_token_1.default, create_group_1.default]);
exports.default = router;
