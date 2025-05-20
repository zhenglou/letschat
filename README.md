#### 实时通信 letschat

功能

1. 添加好友
2. 单聊 群聊
5. AI聊天
4. 实现元素拖拽

优化

1. 消息防抖和限流
2. 安全认证 连接时验证用户身份

技术栈

- 前端

  - UI 框架

    - React v19.1
    - React Router 5.3.4 react-router-dom 5.3.4
    - Redux Toolkit
    - [react-dnd](https://www.npmjs.com/package/react-dnd)
  - css 框架

    - sass
    - tailwind css
  - 脚本语言

    - typescript
  - 运维
    - 测试
      - jest
      - mock
    - 工程化
      - webpack
      - bebel 
      - eslint
    - CI / CD
      - github Action
      - docker
      - 云服务部署

- 服务端

  - node v20.13.1 npm v9.5.0
  - express

  - API 设计范式

    - restful api

  - 数据库 

    - mongodb
    - mongoose
    - Compass 工具

    

### step

##### 第一、二天

1. 搭建前端环境
   1. ~~webpack~~
   2. ~~react~~
   3. ~~bebel~~
   4. ~~ts~~
   5. ~~sass~~
   6. ~~tailwind css~~
   7. ~~eslint 暂时不管~~
   8. ~~jest~~
   9. ~~mock 舍弃~~
2. 搭建后端环境
   1. express
   2. mongoDB
3. 搭建 CI/CD
4. 部署云端及 docker

##### 第三、四天

1. 页面布局

##### 第五、六天

1. 数据库构建
2. 接口搭建

##### 第七、八天

1. 前端逻辑搭建

##### 第九、十天

1. 性能优化









任务：

1. 弄清项目所有文件跑得动不会报错的原理
2. 路由搭建

聊天 好友列表

![image-20250426153525050](C:\Users\zhenglou\AppData\Roaming\Typora\typora-user-images\image-20250426153525050.png)

![image-20250424205734325](C:\Users\zhenglou\AppData\Roaming\Typora\typora-user-images\image-20250424205734325.png)登录

![image-20250424205830943](C:\Users\zhenglou\AppData\Roaming\Typora\typora-user-images\image-20250424205830943.png)

创建群聊

![image-20250424210110783](C:\Users\zhenglou\AppData\Roaming\Typora\typora-user-images\image-20250424210110783.png)

服务端搭建 设计模式 

1. 定义控制层接口
2. 定义 types 请求参数类型
3. 定义服务层接口
4. 定义数据层接口

