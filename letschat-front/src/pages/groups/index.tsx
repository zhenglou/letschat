
// import MessageList from '../components/MessageList'
import EmptyPage from '@/components/EmptyPage'
import { useGroupStore } from '@/stores/group'
import { useEffect } from 'react'
import { Group } from "@/types"
import { useMessageStore } from '@/stores/message'
import Detail from './components/Detail'
import List from './components/List'

const Groups = () => {

    const { active, setActive, getList, deleteGroup, exitGroup} = useGroupStore()
    const deleteChat = useMessageStore(state => state.deleteChat)

    useEffect(() => {
        getList()
    }, [])

    const handleDelete = (group: Group) => {
        deleteGroup(group._id)
        const chatId = String(group._id)
        deleteChat(chatId)
    }
    
    const handleExitGroup = (group: Group) => {
        exitGroup(group._id)
        const chatId = String(group._id)
        deleteChat(chatId)
    }

    return (
        <div className="flex justify-between h-full">
            <div className="w-60 border-r p-2 relative flex flex-col">
                <List onClick={u => setActive(u)}/>
            </div>
            {
                active ?
                <Detail group={active} onDelete={() => handleDelete(active)} onExit={() => handleExitGroup(active)}/> :
		        <EmptyPage/>
            } 
        </div>
    )
}

export default Groups
