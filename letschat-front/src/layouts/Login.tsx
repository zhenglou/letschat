import React, { useState } from 'react'
import FormInput from "@/components/FormInput"
import { Lock, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useNavigate } from "react-router";
import WebSocketClient from '@/utils/WebSocketClient '
import { useWsStore } from '@/stores/ws'
import clsx from 'clsx'
import toast from 'react-hot-toast'

const btn = `text-center bg-[#0c0c1f] text-white rounded-md cursor-pointer  hover:bg-sky-700`

const Login = () => {
  let navigate = useNavigate();
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const userStore = useUserStore()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { loginStatus, token } = await userStore.login(name, password)
    if (loginStatus == 1 && token) {

      const wsClient = new WebSocketClient(token);
      userStore.setConnectdWs(wsClient); 
      useWsStore.setState({ ws: wsClient })
      navigate("/home/messages");
    }
  };

  return (
    <>
      <div className='absolute top-5 left-5'>
        <span>测试用账号1：</span><span>testone 123456</span><br />
        <span>测试用账号2：</span><span>testwo 123456</span>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="text-3xl font-bold mb-5">
          <span className="p-2 text-white bg-black rounded-tl-3xl rounded-br-3xl mr-1">Lets</span>
          <span>chat</span>
          <span className="mx-5">|</span>
          <span>Login</span>
        </div>
        <form className='w-96' onSubmit={handleSubmit}>
          <FormInput Icon={User} >
            <input type="text" placeholder="name" value={name} onChange={e => setname(e.target.value)} />
          </FormInput>
          <FormInput Icon={Lock}>
            <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </FormInput>
          <input type='submit' className={clsx('w-96', 'py-2', btn)} />
          <div className='flex justify-between w-full text-gray-500 mt-3'>
            <div className='hover:text-black cursor-pointer' onClick={() => toast("怎能忘记~")}>Forgot password ?</div>
            <Link className='hover:text-black cursor-pointer' to='/'>Sign up</Link>
          </div>
        </form>

      </div>
    </>
  );
}

export default Login;