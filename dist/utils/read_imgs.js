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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.org_imgs_path = exports.resized_imgs_path = exports.read_org_imgs = exports.read_resized_imgs = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const org_imgs_path = path_1.default.join(__dirname, '..', '..', 'public', 'images');
exports.org_imgs_path = org_imgs_path;
const resized_imgs_path = path_1.default.join(__dirname, '..', '..', 'public', 'resized');
exports.resized_imgs_path = resized_imgs_path;
function ls(read_path) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield fs_1.default.readdirSync(read_path);
        return files;
    });
}
const read_org_imgs = () => __awaiter(void 0, void 0, void 0, function* () { return yield ls(org_imgs_path); });
exports.read_org_imgs = read_org_imgs;
const read_resized_imgs = () => __awaiter(void 0, void 0, void 0, function* () { return yield ls(resized_imgs_path); });
exports.read_resized_imgs = read_resized_imgs;
