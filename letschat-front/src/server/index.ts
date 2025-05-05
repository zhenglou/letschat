export default function commonWebSoket() {
  const ws = new WebSocket('ws://localhost:3000');
  ws.onopen = () => {
    console.log('连接成功！');
  };
  ws.onmessage = (event) => {
    console.log('收到消息:', event.data);
  };

  ws.onerror = (error) => {
    console.error('连接错误:', error);
  };

  ws.onclose = () => {
    console.log('连接关闭');
  };
}
