import { Outlet } from "react-router";
import NavBar from '@/components/NavBar'
import { useEffect, useRef } from "react"
import toast from "react-hot-toast";
import { useFriendStore } from "@/stores/friend";
const Home = () => {
  const userFriendStore = useFriendStore();
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    // 首次渲染时跳过执行
    console.log("userFriendStore.currentReq",userFriendStore.currentReq);
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    toast((t) => (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '12px',
        padding: '8px 4px',
        minWidth: '240px'
      }}>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          收到来自 {userFriendStore.currentReq?.name} 的好友请求
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '8px',
          marginTop: '4px'
        }}>
          <button 
            onClick={() => {
              // 这里添加接受好友请求的逻辑
              userFriendStore.accecptFs();
              toast.dismiss(t.id);
            }}
            style={{ 
              padding: '6px 12px', 
              background: '#4CAF50', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1'
            }}
          >
            接受
          </button>
          <button 
            onClick={() => toast.dismiss(t.id)}
            style={{ 
              padding: '6px 12px', 
              background: '#9e9e9e', 
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              flex: '1'
            }}
          >
            忽略
          </button>
        </div>
      </div>
    ), {
      duration: 10000, // 持续时间延长到10秒
      position: 'top-right' // 位置
    });
  }, [userFriendStore.currentReq]); // 添加空依赖数组，防止toast重复显示
  
  return (
    <>
      {/* navbar */}
      <NavBar />
      {/* chat */}
      <div className="h-full flex-grow  bg-white rounded-xl border border-gray-200">
        <Outlet />
      </div>
    </>
  );
}
export default Home; 