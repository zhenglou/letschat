import React from 'react';
import { useEffect } from 'react';
import { Outlet } from "react-router";
import WebSocketClient from "@/utils/WebSocketClient "
import { userStorage } from "@/utils/storage"
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
interface Props {
  message: string;
}
function App() {
  console.log(process.env.SERVER_URL,"SERVER_URL");
  
  useEffect(() => {
    // 初始化 WebSocket 单例
    if(userStorage.get()){
      const wsClient = new WebSocketClient(userStorage.get().token);
      useUserStore.getState().setConnectdWs(wsClient); 
      useWsStore.setState({ws: wsClient})
    }
  }, []);
  return (
    < div className="w-screen h-screen flex justify-center items-center text-black dark:bg-black">
      <div className="w-11/12 h-5/6 bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center relative py-2 pr-2">
        <Outlet />
      </div>
    </div>
  );
}

export default App;