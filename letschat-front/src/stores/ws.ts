import { Message, MessageType, GroupSendMessage, GroupMessage } from '@/types'
import { create } from 'zustand'
import { useMessageStore } from './message'
import { useUserStore } from './user'
import WebSocketClient from '@/utils/WebSocketClient '

// const BASE_WS = import.meta.env.VITE_APP_WS
const BASE_WS = ""

type WsStore = {
    ws: WebSocketClient | null
    init: () => void
    sendMessage: (msg: Message | GroupSendMessage | GroupMessage) => void
}


export const useWsStore = create<WsStore>((set, get) => ({
    ws: null,

    init: () => {
        if (get().ws) return

        const user = useUserStore.getState().user

        if (!user) return

        if (user === null) return
        const ws = new WebSocket(`${BASE_WS}/connect?Token=${user.token}`)
        ws.onopen = evt => {
            console.log('[ws:open]', evt)
        }
        ws.onmessage = evt => {

            const msg: Message = JSON.parse(evt.data)
            console.log('on-message:', msg)
            if (msg.type === MessageType.Chat) {
                useMessageStore.getState().onMessage(msg)
            }
        }

        // set(() => ({ ws }))
    },

    sendMessage: (msg: GroupSendMessage | Message | GroupMessage) => {
        console.log("发送消息",msg);
        
        const ws = get().ws
        if (ws === null) return
        ws.sendMessage(msg)
    }

}))