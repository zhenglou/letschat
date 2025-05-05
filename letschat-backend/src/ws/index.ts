import { verifyToken } from "@/utils/Jwt";
import { WebSocket, WebSocketServer } from "ws";
import { general } from "@/services/friendshipsService";
import { FriendshipType } from '@/types/friendShips';
import {WebSocketMessage} from '@/types/websoketTypes'
const activeConnections = new Map<string, WebSocket>(); // 用户ID -> WebSocket 连接
function wssFun(wss: WebSocketServer) {
  wss.on('connection', (ws) => {
    ws.on('message', (message: string) => {
      const parsedMessage: WebSocketMessage = JSON.parse(message);
      console.log('收到消息:', parsedMessage);
      if (parsedMessage.type === 'auth') {
        handleAuthentication(ws, parsedMessage.token);
        return;
      }
      if (parsedMessage.type === 'friend_request') {
        console.log("收到好友请求");
        let confirmConnect = 0;
        activeConnections.forEach((conn, id) => {
          if (id == parsedMessage.data.toUserId) {
            confirmConnect = 1;
            const generalData: FriendshipType = {
              requester: parsedMessage.data.fromUserId,
              recipient: parsedMessage.data.toUserId,
              status: 'pending'
            }
            general(generalData).then((res) => {
              console.log(res);
            })
            conn.send(JSON.stringify({ type: 'friend_request', data: parsedMessage.data }));
            console.log("发送成功");
          }
        });
        if (confirmConnect == 0) {
          console.log("好友未在线");
          const generalData: FriendshipType = {
            requester: parsedMessage.data.fromUserId,
            recipient: parsedMessage.data.toUserId,
            status: 'pending'
          }
          general(generalData).then((res) => {
            console.log(res);
          })
        }
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
function handleAuthentication(ws: WebSocket, token?: string) {
  if (!token) {
    ws.close(4001, '未提供 Token');
    return;
  }
  const user = verifyToken(token);
  if (!user) {
    ws.close(4003, 'Token 无效');
    return;
  }
  if (user.name === null) {
    ws.close(4003, 'Token 无效');
    return;
  }
  activeConnections.set(user.id, ws);
  ws.send(JSON.stringify({ type: 'auth', status: 'success' }));
  console.log(`用户 ${user.name} 已连接`);
}
export default wssFun
