import { UserSummary } from '@/types'
import request from '@/utils/request'
import { create } from 'zustand'
import { FriendshipType } from "@/types";
import { updateFriendship } from '@/apis/friendships';
import toast from 'react-hot-toast';
import { getFriendships } from '@/apis/friendships';
import { useUserStore } from './user';
// const BASE = import.meta.env.VITE_APP_URL

type FriendStore = {
    list: Array<UserSummary>
    accecptFs: () => void
    getList: () => Promise<Array<UserSummary>>
    currentReq: UserSummary | null
    currentReqAndRec: FriendshipType | null
    clear: () => void
}

export const useFriendStore = create<FriendStore>((set, get) => ({
    list: [],
    currentReq: null,
    currentReqAndRec: null,
    accecptFs: async () => {
        const createResult = await updateFriendship(get().currentReqAndRec!);
        if(createResult.code === 200){
            toast.success("好友添加成功");
        }else{
            toast.error("好友添加失败");
        }
    },
    getList: async () => {
        const res = await getFriendships(useUserStore.getState().user!.userInfo._id);
        if (res.code === 200) {
            set(() => ({ list: res.data.friendshipDetails }))
        }
        return get().list
    },

    clear: () => {
        set(() => ({
            list: []
        }))
    }
}))