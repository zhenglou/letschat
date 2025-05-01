import Pagination from 'react-paginate'
import { useEffect, useState } from 'react'
import Empty from '@/components/Empty'
import SearchBar from '@/components/SearchBar'
import UserCard from './components/UserCard'
import { UserSummary2 } from '@/types'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon, UserRoundXIcon } from 'lucide-react'
import request, { type Result } from '@/utils/request'
const BASE = "http://localhost:3000";
type Query = {
  pageNo: number
  pageSize: number
  username: string
}
type State = {
  total: number
  users: Array<UserSummary2>
}
const SearchUser = () => {
  const [query, setQuery] = useState<Query>({
    pageNo: 1,
    pageSize: 16,
    username: '',
  })
  const [state, setState] = useState<State>({
    total: 0,
    users: []
  })
  const getUsers = async (query: Query) => {
    const res: Result = await request({
      url: '/users',
      method: 'GET',
      params:query
    })
    console.log(res);

    if (res.data[0] && res.code == 200) {
      setState({
        // total: 50,
        total: res.total || 16,
        users: res.data
      })
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
        <SearchBar className='w-80' placeholder='Search by usename' onChange={evt => setQuery(query => ({ ...query, username: evt.target.value }))} />
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