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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const read_imgs_1 = require("../../utils/read_imgs");
describe('Invalid Query string parameters', () => {
    describe('Wrong query string', () => {
        it('should respond with 400 -> missing filename query', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/images')
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
        it('should respond with 400 -> missing height & width', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/images?filename=icelandwaterfall.jpg')
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
        it('should respond with 400 -> wrong filename', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/images?filename=wrongFileName.jpg&width=200&height=200')
                .expect(400)
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
    });
});
describe('Valid Requests', () => {
    describe('resized version creation', () => {
        it('should respond with 200 -> image resized and cached successfully', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/images?filename=icelandwaterfall.jpg&width=200&height=200')
                .expect(200)
                .expect('Content-Type', 'image/jpg')
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
        it('checks if the image cached or not', () => __awaiter(void 0, void 0, void 0, function* () {
            const resized_img_list = yield (0, read_imgs_1.read_resized_imgs)();
            const resized_img_name = 'icelandwaterfall.jpg' + '_' + '200' + 'x' + '200';
            let found_img = false;
            for (const img of resized_img_list) {
                if (img == resized_img_name) {
                    found_img = true;
                    break;
                }
            }
            expect(found_img).toBe(true);
        }));
    });
});
