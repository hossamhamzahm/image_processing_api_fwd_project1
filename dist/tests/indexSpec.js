"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Invalid Requests URL', () => {
    describe('Wrong paths', () => {
        it('wrong path1: visit /api\nshould result in 404', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api')
                .expect(404)
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
        it('wrong path2: visit /api/image\nshould result in 404', (done) => {
            (0, supertest_1.default)(app_1.default)
                .get('/api/image')
                .expect(404)
                .end(function (err, res) {
                if (err)
                    return done.fail();
                return done();
            });
        });
    });
});
