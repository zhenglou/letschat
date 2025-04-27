import express, { Application, Request, Response } from 'express';

const app: Application = express();
//改变
// 中间件
app.use(express.json());

// 基础路由
app.get('/', (req: Request, res: Response) => {
  res.send('Hello TypeScript!');
});

// 启动服务器
function appLanuch(port:number){
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  
}
export default appLanuch;
