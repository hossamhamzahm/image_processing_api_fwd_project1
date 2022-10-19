"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const errorMiddleware_1 = __importDefault(require("./controller/errorMiddleware"));
const noPath_1 = __importDefault(require("./controller/noPath"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.use('/api', index_1.default);
// render page not found if no path is matched
app.get('*', noPath_1.default);
// error middleware
app.use(errorMiddleware_1.default);
exports.default = app;
