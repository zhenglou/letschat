import { TokenPayload, verifyToken } from "@/utils/Jwt";
import { WebSocket, WebSocketServer } from "ws";
import { dealFriendShips, dealSingleMessage, dealGroupMessage, dealGroupMessageSend } from "@/utils/websoketReqDeal";
import { redisClient } from "@/config/redis"
import { RedisClientType } from 'redis';
import { Message, GroupMessage, GroupSendMessage } from "@/types/messageType";
import { WebSocketMessage } from "@/types/websoketTypes";
const activeConnections = new Map<string, WebSocket>(); // 用户ID -> WebSocket 连接
function wssFun(wss: WebSocketServer) {
  wss.on('connection', (ws) => {
    let redisSubscriber: RedisClientType | null = null;
    ws.on('message', (message: string) => {
      const parsedMessage: any = JSON.parse(message);
      if (parsedMessage.type === 'auth') {
        const { status, user } = handleAuthentication(ws, parsedMessage.token);
        if (status == 4000) {
          // 订阅 Redis 频道
          redisSubscriber = redisClient.duplicate();
          redisSubscriber.connect().then(() => {
            if (redisSubscriber && user) {
              redisSubscriber.subscribe(`chat:${user.id}`, (rawMessage: string) => {
                ws.send(rawMessage);
              });
            }
          });
        }
        return;
      }
      if (parsedMessage.type === 'friend_request') {
        dealFriendShips(activeConnections, parsedMessage)
      }
      if (parsedMessage.type === 'chat') {
        dealSingleMessage(activeConnections, parsedMessage)
      }
      if (parsedMessage.type === 'group') {
        // 由于 dealGroupMessage 需要 GroupMessage 类型，需进行类型保护
        if ('groupId' in parsedMessage) {
          dealGroupMessage(activeConnections, parsedMessage as GroupMessage)
        } else {
          console.error('收到的 group 消息缺少 groupId 字段', parsedMessage)
        }
      }
      if (parsedMessage.type === 'group-chat') {
        dealGroupMessageSend(activeConnections, parsedMessage);
      }

    });
    ws.on('close', () => {
      console.log('WebSocket 客户端连接已关闭');
      // 清理断开的连接
      activeConnections.forEach((conn, id) => {
        if (conn === ws) {
          activeConnections.delete(id);
        }
      });
    });
    // 监听错误事件
    ws.on('error', (error) => {
      console.log('WebSocket error:', error);
    });

  });
}
// 处理用户认证
function handleAuthentication(ws: WebSocket, token?: string): { status: number, user: TokenPayload | null } {
  if (!token) {
    ws.close(4001, '未提供 Token');
    return { status: 4001, user: null };
  }
  const user = verifyToken(token);
  if (!user) {
    ws.close(4003, 'Token 无效');
    return { status: 4003, user: null };
  }
  if (user.name === null) {
    ws.close(4003, 'Token 无效');
    return { status: 4003, user: null };
  }
  activeConnections.set(user.id, ws);
  ws.send(JSON.stringify({ type: 'auth', status: 'success' }));
  console.log(`用户 ${user.name} 已连接`);
  return { status: 4000, user };
}
export default wssFun
