import UserSelector from '@/components/UserSelector'
import { useFriendStore } from '@/stores/friend'
import { useGroupStore } from '@/stores/group'
import { MessageType, UserSummary, GroupMessage } from '@/types'
import { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/stores/user'
import { useWsStore } from '@/stores/ws'
type FormData = {
    groupName: string
    desc: string
    members: Array<UserSummary>
}

const CreateGroup = () => {
    const navigate = useNavigate()
    const createGroup = useGroupStore(state => state.createGroup)

    const [loading, setLoading] = useState<boolean>(false)

    const friends = useFriendStore(state => state.list)

    const { control, register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            groupName: '',
            desc: '',
            members: []
        }
    })


    const getFriendList = useFriendStore(state => state.getList)
    useEffect(() => {
        getFriendList()
    }, [])

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        console.log('2', data)

        const memberIds = data.members.map(e => e._id)
        memberIds.push(useUserStore.getState().user?.userInfo._id!)
        if (loading) return
        setLoading(true)

        const success = await createGroup(data.groupName, data.desc, memberIds)

        if (success) {
            toast.success('Create group success!')
            const groupMsg: GroupMessage = {
                type: MessageType.Group,
                groupId: success.data._id,
            }
            useWsStore.getState().sendMessage(groupMsg)
            navigate('/home/groups')
        }

        setLoading(false)
    }

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="text-4xl font-bold mb-10">Create Group</div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 w-1/2'>

                <div className='w-full flex flex-col relative mb-5'>
                    <div className='font-bold mb-2'>Name</div>
                    <input
                        type="text" placeholder='name' className='input'
                        {...register('groupName', {
                            required: 'Name is required'
                        })}
                    />
                    {errors.groupName && <div className='text-red-600 absolute -bottom-7'>{errors.groupName.message}</div>}
                </div>

                <div className='w-full flex flex-col'>
                    <div className='font-bold mb-2'>Description</div>
                    <textarea
                        className='input' placeholder='description' rows={6}
                        {...register('desc')}
                    />
                </div>

                <div className='w-full flex flex-col relative mb-5'>
                    <div className='font-bold mb-2'>
                        Members <span className='text-gray-500 ml-5 inline-block'>if you have not a friend yet, go to <Link to='/search-user' className='text-blue-dark'>add one</Link> </span>
                    </div>
                    <Controller
                        name='members'
                        control={control}
                        rules={{ required: 'Members is reqiured' }}
                        render={({ field }) => (
                            <UserSelector
                                list={friends}
                                {...field}
                            />
                        )}
                    />
                    {/* <input type="hidden" { ...register('members') } value={members} /> */}
                    {errors.members && <div className='text-red-600 absolute -bottom-7'>{errors.members.message}</div>}
                </div>

                <input type='submit' className='btn' />
            </form>
        </div>
    )
}

export default CreateGroup
