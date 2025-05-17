import { createClient } from 'redis';
// 连接 Redis
const redisClient = createClient({
  url: 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis 重连次数过多，停止重连');
        return new Error('Redis 重连失败');
      }
      return Math.min(retries * 100, 3000);
    }
  }
});
const redisPublisher = redisClient.duplicate();
const redisSubscriber = redisClient.duplicate();

// 添加错误处理
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
  // 不要立即退出，让重连策略处理
});

redisPublisher.on('error', (err) => {
  console.error('Redis Publisher Error:', err);
  // 不要立即退出，让重连策略处理
});

redisSubscriber.on('error', (err) => {
  console.error('Redis Subscriber Error:', err);
  // 不要立即退出，让重连策略处理
});

// 初始化 Redis 连接
const redisConnect = async () => {
  try {
    await redisClient.connect();
    await redisPublisher.connect();
    await redisSubscriber.connect();
    console.log('Redis connected successfully');
  } catch (err) {
    console.error('Redis connection error:', err);
    // 不要立即退出，让重连策略处理
  }
};
export { redisClient, redisPublisher, redisConnect, redisSubscriber };
