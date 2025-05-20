import { useUserStore } from "@/stores/user";
import {WebSocketMessage} from '@/types/websoketTypes'
const user = useUserStore(state => state.user);
const { userInfo, token } = user!;
export default function contactWS() {
  const ws = new WebSocket('ws://localhost:3000');
  ws.onopen = () => {
    console.log('连接成功！');
    ws.send(JSON.stringify({
      id: userInfo._id,
      token
    }))
  };
  ws.onmessage = (event) => {
    const message: WebSocketMessage = JSON.parse(event.data);
    if (message.type === 'friend_request') {
      console.log('收到好友请求:', message);
    }
    console.log(message);
    
  };

  ws.onerror = (error) => {
    console.error('连接错误:', error);
  };

  ws.onclose = () => {
    console.log('连接关闭');
  };
}
