const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // 加载 .env 文件

// 初始化 Express 应用
const app = express();

// 中间件配置
app.use(cors());          // 允许跨域请求
app.use(express.json());  // 解析 JSON 格式请求体

// MongoDB 连接
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// 路由挂载
app.use('/api/users', require('./routes/userRoutes'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});