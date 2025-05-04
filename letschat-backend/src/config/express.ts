import express, { Application } from 'express';
import routes from '@/routes';
import { connectDB } from "./mongodb"
import { tokenVerifyMw } from '@/middleware/tokenVerifyMw';
import cors from 'cors';
const app: Application = express();
// 允许所有源
app.use(cors());
connectDB();
// 中间件
app.use(express.json());
app.use(tokenVerifyMw)
// 注册路由
app.use(routes);
// 全局错误处理
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});
// 启动服务器
function appLanuch(port: number) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default appLanuch;
