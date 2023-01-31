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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImageChatGroup = exports.uploadImageChat = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var chat_1 = __importStar(require("../../models/chat"));
var user_1 = __importDefault(require("../../models/user"));
var message_1 = __importDefault(require("../../views/message"));
var lodash_1 = __importDefault(require("lodash"));
var chat_group_1 = __importStar(require("../../models/chat-group"));
var groups_1 = __importDefault(require("../../models/groups"));
var imageStorage = multer_1.default.diskStorage({
    // Destination to store image
    destination: "static",
    filename: function (req, file, cb) {
        var fileName = file.fieldname +
            "_" +
            Date.now() +
            path_1.default.extname(file.originalname + ".jpg");
        req.query.fileName = fileName;
        cb(null, fileName);
    },
});
var upload = (0, multer_1.default)({
    storage: imageStorage,
    limits: {
        fileSize: 1000000, // 1000000 Bytes = 1 MB
    },
    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error("Please upload a Image"));
        }
        cb(null, true);
    },
});
function uploadImageChat(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var validateReceiverIdRes, isSenderExist, isReceiver, newChat, chat;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    validateReceiverIdRes = (0, chat_1.validateReceiverId)({
                        receiverId: req.params.receiverId,
                    });
                    if (validateReceiverIdRes.error)
                        return [2 /*return*/, res.status(400).send((0, message_1.default)({
                                statusCode: 400,
                                data: validateReceiverIdRes.error.message,
                                message: "Bad Request",
                            }))];
                    return [4 /*yield*/, user_1.default.findById(req.query._id)];
                case 1:
                    isSenderExist = _b.sent();
                    if (!isSenderExist) {
                        return [2 /*return*/, res.status(404).send((0, message_1.default)({
                                statusCode: 404,
                                message: "Sender is not found",
                                data: req.body,
                            }))];
                    }
                    return [4 /*yield*/, user_1.default.findById(req.params.receiverId)];
                case 2:
                    isReceiver = _b.sent();
                    if (!isReceiver) {
                        return [2 /*return*/, res.status(404).send((0, message_1.default)({
                                statusCode: 404,
                                message: "Receiver is not found",
                                data: req.body,
                            }))];
                    }
                    newChat = new chat_1.default({
                        senderId: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a._id,
                        receiverId: req.params.receiverId,
                        content: req.query.fileName,
                        contentType: "image",
                    });
                    return [4 /*yield*/, newChat.save()];
                case 3:
                    chat = _b.sent();
                    res.send((0, message_1.default)({
                        statusCode: 200,
                        message: "Chat Image has successfully sent",
                        data: __assign(__assign({}, lodash_1.default.pick(chat, "senderId", "receiverId", "content", "contentType", "isDeleteMe", "_id")), { baseUrl: process.env.baseUrlImage }),
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImageChat = uploadImageChat;
function uploadImageChatGroup(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var validategroupIdRes, isSenderExist, isReceiver, newChat, chat;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    validategroupIdRes = (0, chat_group_1.validateGroupId)({
                        groupId: req.params.groupId,
                    });
                    if (validategroupIdRes.error)
                        return [2 /*return*/, res.status(400).send((0, message_1.default)({
                                statusCode: 400,
                                data: validategroupIdRes.error.message,
                                message: "Bad Request",
                            }))];
                    return [4 /*yield*/, user_1.default.findById(req.query._id)];
                case 1:
                    isSenderExist = _b.sent();
                    if (!isSenderExist) {
                        return [2 /*return*/, res.status(404).send((0, message_1.default)({
                                statusCode: 404,
                                message: "Sender is not found",
                                data: req.body,
                            }))];
                    }
                    return [4 /*yield*/, groups_1.default.findById(req.params.groupId)];
                case 2:
                    isReceiver = _b.sent();
                    if (!isReceiver) {
                        return [2 /*return*/, res.status(404).send((0, message_1.default)({
                                statusCode: 404,
                                message: "Receiver is not found",
                                data: req.body,
                            }))];
                    }
                    newChat = new chat_group_1.default({
                        senderId: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a._id,
                        groupId: req.params.groupId,
                        content: req.query.fileName,
                        contentType: "image",
                    });
                    return [4 /*yield*/, newChat.save()];
                case 3:
                    chat = _b.sent();
                    res.send((0, message_1.default)({
                        statusCode: 200,
                        message: "Chat Image has successfully sent",
                        data: __assign(__assign({}, lodash_1.default.pick(chat, "senderId", "groupId", "content", "contentType", "isDeleteMe", "_id")), { baseUrl: process.env.baseUrlImage }),
                    }));
                    return [2 /*return*/];
            }
        });
    });
}
exports.uploadImageChatGroup = uploadImageChatGroup;
exports.default = upload;
