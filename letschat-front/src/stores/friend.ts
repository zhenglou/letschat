import { UserSummary } from '@/types'
import request from '@/utils/request'
import { create } from 'zustand'

// const BASE = import.meta.env.VITE_APP_URL

type FriendStore = {
    list: Array<UserSummary>
    getList: () => Promise<Array<UserSummary>>
    clear: () => void
}

export const useFriendStore = create<FriendStore>((set, get) => ({
    list: [],

    getList: async () => {
        const res = await request({
            url: '/contacts/list',
            method: "GET"
        })

        if (res) {
            set(() => ({ list: res.data }))
        }
        
        return get().list
    },

    clear: () => {
        set(() => ({
            list: []
        }))
    }
}))