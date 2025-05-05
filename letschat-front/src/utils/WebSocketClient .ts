import toast from "react-hot-toast";
const WS_URL = 'ws://localhost:3000';
import {WebSocketMessage} from '@/types/websoketTypes'
export default class WebSocketClient {
  private ws: WebSocket | null = null;
  private token: string;

  constructor(token: string) {
    this.token = token;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log(1111);
      
      // 发送认证 Token
      this.send({ type: 'auth', token: this.token });
    };

    this.ws.onmessage = (event) => {
      const message: WebSocketMessage = JSON.parse(event.data);
      if(!message){
        toast.error('连接失败')
        return;
      }
      if (message.type === 'friend_request') {
        this.handleFriendRequest(message.data);
      }
      if (message.type === 'auth') {
        console.log(message.status);
      }
    };

    this.ws.onclose = () => {
      console.log('连接断开，尝试重连...');
      // setTimeout(() => this.connect(), 3000);
    };
  }

   send(data: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  private handleFriendRequest(data: any) {
    console.log('收到好友请求:', data);
    toast.success(`收到好友请求 ${data}`)
    // 显示弹窗或更新 UI
    // alert(`新好友请求来自用户 ${data.fromUserId}: ${data.message}`);
  }
}

// // 用户B登录后初始化（示例）
// const userBToken = '用户B的JWT_TOKEN'; // 从登录接口获取
// const wsClient = new WebSocketClient(userBToken);