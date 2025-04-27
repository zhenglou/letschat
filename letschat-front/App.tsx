import React from 'react';
import { Outlet } from "react-router";
interface Props {
  message: string;
}
function App() {
  return (
    < div className="w-screen h-screen flex justify-center items-center text-black dark:bg-black">
      <div className="w-11/12 h-5/6 bg-gray-100 rounded-xl overflow-hidden flex justify-center items-center relative py-2 pr-2">
        <Outlet />
      </div>
    </div>
  );
}

export default App;