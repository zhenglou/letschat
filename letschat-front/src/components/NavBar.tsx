
import Avatar from '@/components/Avatar'
import Menu from '@/components/Menu'
import ModeToggle from '@/components/ModeToggle'
// import { useUserStore } from '@/stores/user'
import { Link } from 'react-router'

const NavBar = () => {
    const user = {
      username:'zhenglou',
      email:'1299302045@qq.com'
    }

    return (
        <div className="w-52 h-full flex flex-col justify-between flex-shrink-0">
            <div className="flex items-center gap-2 py-4 px-5">
                <span className=' bg-black text-white font-bold p-1 rounded-tl-xl rounded-br-xl'>lets</span>
                <span className='text-lg font-bold'>chat</span>
            </div>
            
            {/* Menu */}
            <Menu/>
            {/* Toggle mode */}
            <ModeToggle/>

            {/* info */}
            <Link to='/' className="border-t p-5 flex gap-2 items-center cursor-pointer relative">
        
                <Avatar name={user?.username} className='flex-shrink-0'/>
                <div className='relative overflow-hidden'>
                    <div className="text-base font-bold text-ellipsis overflow-hidden">{ user?.username }</div>
                    <div className="text-sm text-gray-500 text-ellipsis overflow-hidden">{ user?.email }</div>
                </div>
            </Link>
        </div>
    )
}

export default NavBar