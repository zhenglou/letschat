import { Chat, ChatType, GroupChat, Message, SingleChat, UserSummary } from '@/types'
import { chatStorage } from '@/utils/storage'
import { produce } from 'immer'
import { create } from 'zustand'
import { useFriendStore } from './friend'
import { useGroupStore } from './group'
import { Group } from "@/types"
import { useUserStore } from './user'

type MessageStore = {
    active: Chat | null
    chatList: Array<Chat>
    temp: Temp
    addChat: (user: Chat) => Chat
    createChatFromMessage: (msg: Message) => Promise<number>
    findChat: (_id: string) => Chat | undefined
    findChatIndex: (_id: string) => number
    deleteChat: (_id: string) => void
    setActive: (contact: Chat) => void
    onMessage: (msg: Message) => Promise<void>
    setHistory: (chatId: string, ...msgs: Message[]) => void
    clear: () => void
}


type Temp = {
    [key: string]: Array<Message>
}

export const useMessageStore = create<MessageStore>((set, get) => ({
    active: chatStorage.fist(),
    chatList: chatStorage.getList(),
    temp: {},

    addChat: (chat: Chat) => {
        const chatList = get().chatList
        let exist = chatList.find(e => e.id === chat.id)
        // console.log(exist, 'exist');

        if (!exist) {
            set(() => ({ chatList: [chat, ...get().chatList] }))

            exist = chat
        }
        chatStorage.setList(get().chatList)
        return exist
    },

    createChatFromMessage: async (msg: Message) => {
        const _id = msg.chatId
        const chatFactory = get().temp[_id]
        if (chatFactory) {
            chatFactory.push(msg)
            return -1
        }


        set((state) => ({
            temp: {
                ...state.temp,
                [_id]: [msg]
            }
        }))
        console.log('create-chat-from-message', msg)

        if (msg.chatType === ChatType.Single) {
            await useFriendStore.getState().getList()
            let owner: UserSummary | undefined
            const user: any = useUserStore.getState().user
            const users = useFriendStore.getState().list.slice()

            if (user) {
                const loginedUser: UserSummary = {
                    _id: user._id,
                    name: user.username,

                }
                users.push(loginedUser)
            }

            if (user === null) return -1

            owner = users.find(e => e._id === user._id)

            const ids = msg.chatId.split('-')
            const toId = ids.find(e => String(e) !== String(owner?._id))
            const toUser = users.find(e => String(e._id) === String(toId))


            if (!owner) return -1
            if (!toUser) return -1

            const chat: SingleChat = {
                type: ChatType.Single,
                id: msg.chatId,
                from: owner,
                to: toUser,
                history: []
            }

            set(produce((state: MessageStore) => {
                state.chatList.unshift(chat)
            }))

        }

        if (msg.chatType === ChatType.Group) {
            const groups = await useGroupStore.getState().getList()
            const find = groups.find((g: Group) => String(g._id) === msg.chatId)

            if (find === undefined) return -1

            const chat: GroupChat = {
                type: ChatType.Group,
                id: String(find._id),
                group: find,
                history: []
            }

            set(produce((state: MessageStore) => {
                state.chatList.unshift(chat)
            }))


        }

        if (get().temp[_id]) {
            get().setHistory(_id, ...get().temp[_id])
            set(produce(state => {
                delete state.temp[_id]
            }))
        }

        return 0
    },

    onMessage: async (msg: Message) => {
        console.log('on-message:', msg)
        let hasChat = get().findChatIndex(msg.chatId)

        if (hasChat < 0) {
            get().createChatFromMessage(msg)
        } else {
            get().setHistory(msg.chatId, msg)
        }

    },

    setHistory: (chatId: string, ...msgs: Message[]) => {
        // const chatIndex = get().findChatIndex(chatId)
        // if (chatIndex < 0) return

        // set(produce((state: MessageStore) => {
        //     const history = state.chatList[chatIndex].history
        //     history.push(...msgs)
        //     if (history.length > 100) history.shift()
        // }))

        // chatStorage.setList(get().chatList)


        // const active = get().active
        // if (active && active.id === chatId) {

        //     set(produce(state => {
        //         const history = state.active.history
        //         history.push(...msgs)
        //         if (history.length > 100) history.shift()
        //     }))
        // }
    },

    // setHistory()

    findChat: (_id: string) => {
        return get().chatList.find(e => e.id === _id)
    },

    deleteChat: (_id: string) => {
        const index = get().findChatIndex(_id)
        if (index < 0) return


        set(produce(state => {
            if (state.active === _id) {
                state.active = null
            }
            state.chatList.splice(index, 1)
        }))


        chatStorage.setList(get().chatList)

    },

    findChatIndex: (_id: string) => {
        return get().chatList.findIndex(e => e.id === _id)
    },

    setActive: (chat: Chat) => {
        console.log("进入setActive",chat);

        set(() => ({ active: chat }))

        const chatList = get().chatList.slice()

        if (chatList.length) {
            const index = get().findChatIndex(chat.id)
            const find = chatList.splice(index, 1)
            set(() => ({ chatList: chatList }))
            get().addChat(find[0])
        }

    },

    clear: () => {
        set(() => ({ active: null, chatList: [] }))

        chatStorage.clear()
    }

}))