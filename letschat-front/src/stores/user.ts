import { User, User2,User3 } from '@/types'
import request from '@/utils/request'
import { userStorage } from '@/utils/storage'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { useGroupStore } from './group'
import { useMessageStore } from './message'
import { loginUser } from '@/apis/users'
import toast from 'react-hot-toast'
import WebSocketClient from '@/utils/WebSocketClient '
import { FriendRequest, FriendshipType} from '@/types'
// const BASE = import.meta.env.VITE_APP_URL
// const BASE_WS = import.meta.env.VITE_APP_WS

type UserStore = {
    user: User3 | null
    setUser: (user?: User3) => void
    login: (username: string, password: string) => any
    logout: () => void,
    connectdWs:  WebSocketClient | null,
    setConnectdWs: (ws: WebSocketClient | null) => void,
    sendFriendRequest: (fs:FriendshipType) => void
    // connectWS: () => void
}

export const useUserStore = create<UserStore>((set, get) => ({
    user: userStorage.get(),
    connectdWs: null,
    setUser: (user?: User3) => {
        if (user === undefined) {
            const userStored = userStorage.get()
            set(() => ({ user: userStored }))
        } else {
            userStorage.set(user)
            set(() => ({ user }))
        }
    },
    login: async (name, password) => {
        const res = await loginUser({ name, password })
        if (res.code == 200) {
            get().setUser(res.data)
            
            toast.success("登录成功")
            // location.href = '/home/messages'
            return {token:res.data.token,loginStatus:1};
            // get().connectWS()
        } else {
            toast.error(res.message)
            return 0;
        }
    },
    setConnectdWs: (ws: WebSocketClient | null) => {
        set(() => ({ connectdWs: ws }))
    },
    sendFriendRequest: async (fs) => {
        get().connectdWs?.send({ type: 'friend_request', data: fs })
    },
    // connectWS: () => {
    //     const user = get().user
    //     if (user === null) return
    //     const ws = new WebSocket(`${BASE_WS}/connect?Token=${user.token}`)
    //     ws.onopen = evt => {
    //         console.log('[ws:open]', evt)
    //     }
    //     ws.onmessage = evt => {
    //         const data = JSON.parse(evt.data)
    //         console.log('[ws:onmessage]', data)
    //     }
    // },
    logout: () => {
        set(() => ({ user: null }))
        userStorage.delete()


        location.href = '/'

        useMessageStore.getState().clear()
        useGroupStore.getState().clear()
        useFriendStore.getState().clear()
    }
}))