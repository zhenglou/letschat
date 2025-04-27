import { Outlet } from "react-router";
import NavBar from '@/components/NavBar'
const Home = () => {
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