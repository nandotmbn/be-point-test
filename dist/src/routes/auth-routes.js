"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var register_user_1 = __importDefault(require("../controllers/auth/register-user"));
var login_user_1 = __importDefault(require("../controllers/auth/login-user"));
var router = express_1.default.Router();
router.post("/auth/register", [register_user_1.default]);
router.post("/auth/login", [login_user_1.default]);
exports.default = router;
