import express, { Application } from 'express';
import routes from '../routes';

const app: Application = express();

// 中间件
app.use(express.json());

// 注册路由
app.use(routes);

// 启动服务器
function appLanuch(port:number){
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default appLanuch;
