import Avatar from '@/components/Avatar'
import { SingleChat } from '@/types'
import { useUserStore } from "@/stores/user"
type Props = {
    data: SingleChat
    onClick: (data: SingleChat) => void
}
const SingleCard = ({ data, onClick }: Props) => {
    const user = useUserStore(state => state.user)
    return (
        <div
            key={data.to.name}
            className="flex gap-3 items-center border mb-3 p-2 rounded-lg border-gray-100 cursor-pointer hover:bg-gray-50"
            onClick={() => onClick(data)}
        >

            <Avatar name={data.to.name} />
            <div>
                <div className="font-bold text-base">{data.to.name}</div> 
                {
                    data.history.length > 0 && <div className="text-sm text-gray-500">{data.history[data.history.length - 1].content.slice(0, 10)}</div>
                }
            </div>
        </div>
    )
}

export default SingleCard
