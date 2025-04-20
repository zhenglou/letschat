"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// 中间件
app.use(express_1.default.json());
// 基础路由
app.get('/', (req, res) => {
    res.send('Hello TypeScript!');
});
// 启动服务器
function appLanuch(port) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
}
exports.default = appLanuch;
