import { WebSocketServer, WebSocket, Server } from 'ws';
import { verifyToken } from '@/utils/Jwt';
import http from 'http';
import { WebSocketMessage } from '@/types/websoketTypes'
import {
  IncomingMessage,
  ServerResponse
} from "http"
interface FriendRequest {
  fromUserId: string;
  toUserId: string;
  message?: string;
}

function createWebSocketServer(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>): WebSocketServer {
  const wss = new WebSocketServer({ server });
  // wss.on('connection', (ws: WebSocket) => {
  //   ws.on('message', (message: string) => {
  //     const parsedMessage: WebSocketMessage = JSON.parse(message);
  //     console.log('收到消息:', parsedMessage);

  //   });
  // });
  // wss.on('close', () => {
  //   console.log('WebSocket 连接已关闭');
  // });
  return wss;
}

// 使用函数创建WebSocket服务器
// const wss = createWebSocketServer(server)
// 内存存储（生产环境请替换为数据库）
// const activeConnections = new Map<string, WebSocket>(); // 用户ID -> WebSocket 连接

// WebSocket 连接处理
// wss.on('connection', (ws: WebSocket) => {
//   ws.on('message', (rawMessage: string) => {
//     try {
//       const message: WebSocketMessage = JSON.parse(rawMessage);
//       if (message.type === 'auth') {
//         handleAuthentication(ws, message.token);
//       }
//     } catch (err) {
//       console.error('消息解析失败:', err);
//     }
//   });
//   ws.on('close', () => {
//     // 清理断开的连接
//     activeConnections.forEach((conn, userId) => {
//       if (conn === ws) {
//         activeConnections.delete(userId);
//       }
//     });
//   });
// });



// 处理用户认证
// function handleAuthentication(ws: WebSocket, token?: string) {
//   if (!token) {
//     ws.close(4001, '未提供 Token');
//     return;
//   }

//   const user = verifyToken(token);
//   if (!user) {
//     ws.close(4003, 'Token 无效');
//     return;
//   }

//   activeConnections.set(user.id, ws);
//   console.log(`用户 ${user.username} 已连接`);
// }

export default createWebSocketServer;