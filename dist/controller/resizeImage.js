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
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const read_imgs_1 = require("../utils/read_imgs");
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    // handling missing data
    if (!filename)
        return next(Error('You must include a filename parameter in the query string'));
    if (!width)
        return next(Error('You must include a width parameter in the query string'));
    if (!height)
        return next(Error('You must include a height parameter in the query string'));
    // get all resized images
    const resized_img_list = yield (0, read_imgs_1.read_resized_imgs)();
    const resized_img_name = filename + '_' + width + 'x' + height;
    const read_path = path_1.default.join(__dirname, '..', '..', 'public', 'images', filename);
    const resized_img_path = path_1.default.join(__dirname, '..', '..', 'public', 'resized', resized_img_name);
    // looking for a cached version of the resized image
    let found_img = false;
    for (const img of resized_img_list) {
        if (img == resized_img_name) {
            found_img = true;
            break;
        }
    }
    // create a resized version then caching it
    if (found_img == false) {
        const img_buffer = yield (0, sharp_1.default)(read_path)
            .rotate()
            .resize(parseInt(width), parseInt(height))
            .jpeg({ mozjpeg: true })
            .toBuffer();
        yield fs_1.default.writeFileSync(resized_img_path, img_buffer);
    }
    // respond with the image
    res.contentType('image/jpg');
    res.sendFile(resized_img_path);
});
exports.default = resizeImage;
