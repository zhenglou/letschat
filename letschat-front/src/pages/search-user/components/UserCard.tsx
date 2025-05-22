import Avatar from '@/components/Avatar'
import { useUserStore } from '@/stores/user'
import { UserSummary2 } from '@/types'
import { toLogin } from '@/utils/fake'
import { motion } from 'framer-motion'
import { LogIn, UserPlus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FriendshipType } from '@/types'
const BaseUrl = ""

type Props = {
    user: UserSummary2
}


const UserCard = ({ user }: Props) => {
    const [top, setTop] = useState<string | number>('100%')
    const userStore = useUserStore()
    const toAddFriend = async (user: UserSummary2) => {
        const friendRequest: FriendshipType = {
            requester: userStore.user?.userInfo._id!, // Assuming you have a way to get the current user's ID
            recipient: user._id, // The ID of the user you want to send a friend request to
        };

        userStore.sendFriendRequest(friendRequest)
        toast.success(`Friend request has been sent to: ${user.name}`)
    }
    // const res = await getUserList(user)
    // if (res.code == 200) {
    //     toast.success(`Friend request has been sent to: ${user.name}`)
    // }
    // if (res.success) {
    //     toast.success(`Friend request has been sent to: ${user.username}`)
    // }
    

    return (
        <div
            className='bg-white rounded-md border p-2 flex items-center gap-3 cursor-pointer h-32 overflow-hidden relative'
            onMouseEnter={() => setTop(0)}
            onMouseLeave={() => setTop('100%')}
        >
            <Avatar name={user.name} className='flex-shrink-0' />
            <div className='overflow-hidden'>
                <div className='font-bold text-xl text-ellipsis overflow-hidden'>{user.name}</div>
                {/* <div className='text-ellipsis overflow-hidden'>age { user.age }</div> */}
            </div>
            <motion.div
                className='absolute bg-white w-full h-full flex justify-center items-center bg-opacity-95 gap-10'
                initial={{ top: '100%' }}
                animate={{ top }}
            >
                <div className='flex flex-col items-center' onClick={() => useUserStore.getState().logout()}>
                    <LogIn /> <span className='text-gray-500'>Login</span>
                </div>
                <div className='flex flex-col items-center' onClick={() => toAddFriend(user)}>
                    <UserPlus /> <span className='text-gray-500'>Add Friend</span>
                </div>
            </motion.div>
        </div>
    )
}

export default UserCard
