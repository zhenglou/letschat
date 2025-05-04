import Pagination from 'react-paginate'
import { useEffect, useState } from 'react'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import UserCard from './components/UserCard'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, UserRoundXIcon } from 'lucide-react'
import { getUserList } from '@/apis/users'
import { User3, UserSummary2 } from '@/types'
import { useUserStore } from '@/stores/user'
import toast from 'react-hot-toast'
type Query = {
  pageNo: number
  pageSize: number
  name: string
}
type State = {
  total: number
  users: Array<UserSummary2>
}
const SearchUser = () => {
  const [query, setQuery] = useState<Query>({
    pageNo: 1,
    pageSize: 16,
    name: '',
  })
  const [state, setState] = useState<State>({
    total: 0,
    users: []
  })
  const user = useUserStore().user!;
  const getUsers = async (query: Query) => {
    try {
      let resRaw = await getUserList(query);
      resRaw.total = resRaw.total - 1
      if (resRaw.data[0] && resRaw.code == 200) {
        const res = resRaw.data.filter((item: UserSummary2) => {
          return user.userInfo._id != item._id;
        })
        setState({
          total: resRaw.total || 16,
          users: res
        })
      }
    } catch (error) {
      toast.error("token过期或不存在，请重新登录")
    }

  }
  useEffect(() => {
    getUsers(query)
  }, [query])

  const handlePageChange = (evt: any) => {
    setQuery(query => ({
      ...query,
      pageNo: evt.selected + 1
    }))
  }
  return (
    <div className="h-full flex-grow flex flex-col justify-center items-center">
      <div className='flex  justify-center items-center gap-6 h-28'>
        <div className='flex items-center justify-center text-2xl font-bold flex-shrink-0'>
          <div className='bg-black text-white rounded-tl-2xl rounded-br-2xl px-2 py-2 mr-2'>
            Go
          </div>
          Search User
        </div>
        <SearchBar className='w-80' placeholder='Search by usename' onChange={evt => setQuery(query => ({ ...query, name: evt.target.value }))} />
      </div>
      {
        state.users.length ?
          <div className='w-full h-2/3 rounded-lg grid grid-cols-4 overflow-y-auto  flex-wrap relative px-10 gap-5 auto-rows-min flex-grow'>
            {
              state.users.map(u => (
                <UserCard user={u} key={u._id} />
              ))
            }
          </div> :
          <div className='flex-grow flex items-center justify-center'>
            <Empty text='No user founded' Icon={UserRoundXIcon} />
          </div>
      }

      <Pagination
        pageRangeDisplayed={6}
        pageCount={Math.ceil(state.total / query.pageSize)}
        onPageChange={handlePageChange}
        previousLabel={<ArrowLeftCircleIcon />}
        nextLabel={<ArrowRightCircleIcon />}
        className='flex w-full justify-center h-20 items-center'
        pageClassName='mx-2 size-8 flex items-center justify-center'
        activeClassName='rounded-full bg-black text-white'
      />
    </div>
  );
}

export default SearchUser;