"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const async_wrapper_express_ts_1 = __importDefault(require("async-wrapper-express-ts"));
const resizeImage_1 = __importDefault(require("../controller/resizeImage"));
const router = express_1.default.Router();
router.get('/', (0, async_wrapper_express_ts_1.default)(resizeImage_1.default));
exports.default = router;
