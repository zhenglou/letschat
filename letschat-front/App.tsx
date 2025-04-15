import React from 'react';
const a:string = "!11"
// import "./src/styles/common.scss 🙂 " 
import "@/styles/globals.css"  
interface Props {
  message: string;
}
function App() {
  return <div className='underline' style={{color:'red'}}>Hello letschat!</div>;
}

export default App;