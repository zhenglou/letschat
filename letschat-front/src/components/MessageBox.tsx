import { useUserStore } from "@/stores/user"
import { ContentType, GroupSendMessage, Message } from "@/types"
// import { Emoji } from "emoji-picker-react"
import { useEffect, useRef } from "react"
import Avatar from "./Avatar"
import { Emoji } from "emoji-picker-react"

const Content = (msg: Message |GroupSendMessage) => {
    return <>
        {
            msg.contentType === ContentType.Text && msg.content
        }
        {
            msg.contentType === ContentType.Emoji && <Emoji unified={msg.content} />
        }
    </>
}


type Props = {
    messages: Array<Message | GroupSendMessage>
}
const MessageBox = ({ messages} : Props) => {
    const user = useUserStore(state => state.user)

    const boxRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const scrollToBottom = () => {
        setTimeout(() => {
            boxRef.current?.scrollIntoView({behavior: 'smooth', block: 'end'})
        }, 100)
    }

    return (
        <div className="p-5 flex-grow overflow-y-auto w-full h-full flex flex-col">
            <div ref={boxRef}>
            {
                messages.map((e, index) => (
                    <div key={`message-${e.date}-${index}`} className="flex">
                        {
                            e.from._id === user?.userInfo._id ?
                            <div className="flex items-center justify-end w-full">
                                <div className="border p-2 m-2 rounded-md bg-black text-white">
                                    { Content(e) }
                                </div>
                                <Avatar name={user?.userInfo.name} className="size-7 text-sm"/>
                            </div>:
                            <div className="flex items-center w-full">
                                <Avatar name={e.from.name} className="size-7 text-sm"/>
                                <div className="border p-2 m-2 rounded-md">
                                    { Content(e) }
                                </div>
                            </div>
                        }
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default MessageBox
