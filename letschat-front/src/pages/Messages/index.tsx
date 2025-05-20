
import Chat from '@/pages/Messages/components/Chat'
import { useMessageStore } from '@/stores/message'

import Empty from '@/components/Empty'
// import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
import { Content, GroupSendMessage, Message, MessageType, SingleChat, UserSummary } from '@/types'
import { useEffect } from 'react'
import MessageList from './components/MessageList'
import { useUserStore } from '@/stores/user'


const Messages = () => {
    const { active, chatList, setActive } = useMessageStore()

    const user = useUserStore(state => state.user)
    const sendMessage = useWsStore(state => state.sendMessage)

    useEffect(() => {
        if (chatList.length) {
            setActive(chatList[0])
        }
    }, [])

    const onSend = (content: Content) => {
        console.log(active);
        
        if (!user || !active) return
        const from: UserSummary = {
            _id: user.userInfo._id,
            name: user.userInfo.name,
            age: user.userInfo.age
        }
        
        if (active.type == "single") {
            const msg:Message = {
                type: MessageType.Chat,
                from: from,
                to: (active as SingleChat).to,
                chatId: active.id,
                chatType: active.type,
                contentType: content.type,
                content: content.value,
                date: new Date().getTime()
            }
            sendMessage(msg)
        }
        if(active.type == "group"){
            const msg:GroupSendMessage = {
                type: MessageType.GroupSend,
                from: from,
                chatType: active.type,
                contentType: content.type,
                content: content.value,
                groupId:active.group._id,
                groupName:active.group.groupName,
                desc:active.group.desc,
                owner:active.group.owner,
                members:active.group.members,
                date: new Date().getTime()
            }
            sendMessage(msg)
        }
    
    }

    return (
        <div className="flex justify-between h-full">
            {/* List */}
            <MessageList />
            {/* Chat */}

            {
                active ?
                    <Chat group={active} onSend={onSend} /> :
                    <Empty />
            }
        </div>
    )
}

export default Messages
