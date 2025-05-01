import { UserSummary } from '@/types'
import request, { Result } from '@/utils/request'
import { produce } from 'immer'
import { create } from 'zustand'

// const BASE = import.meta.env.VITE_APP_URL

export type Group = {
    id: string,
    name: string,
    desc: string,
    owner: UserSummary
    members: Array<UserSummary>
}

type GroupStore = {
    active: Group | null
    list: Array<Group>
    setActive: (group:Group) => void,
    createGroup: (name: string, desc: string, memberIds: Array<number>) => Promise<any>
    deleteGroup: (groupId: string) => Promise<any>
    exitGroup: (groupId: string) => Promise<any>
    getList: () => Promise<Array<Group>>
    clear: () => void
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    active: null,
    list: [],
    
    setActive: (group: Group) => {
        set(() => ({active: group}))
    },

    createGroup: async (name: string, desc: string, memberIds: Array<number>) => {
        const res = await request({
            url: '/group',
            data: {
                name,
                desc,
                memberIds
            },
            method: 'POST'
        })

        return res
    },

    getList: async () => {
        const res = await request({
            url: '/group/list',
            method: "GET"
        })

        if (res) {
            console.log('get-group:', res)
            const list = res.data.map((e:any) => ({
                ...e.group,
                members: e.members
            }))
            set(() => ({ list }))
        }
        
        return get().list
    },

    deleteGroup: async (groupId: string) => {
        console.log('xxxxxx', groupId)

        const res = await request({
            url: `/group/${groupId}`,
            method: 'DELETE'
        })

        if (res) {
            set(produce((state: GroupStore) =>{
                const index = state.list.findIndex((e:Group) => e.id === groupId)

                state.list.splice(index, 1)
            }))

            set(() => ({
                active: null
            }))
        }
        return res
    },

    exitGroup: async (groupId: string) => {

        const res = await request({
            url: `/group/exit/${groupId}`,
            method: 'POST'
        })

        if (res) {
            set(produce((state:GroupStore) =>{
                const index = state.list.findIndex((e:Group) => e.id === groupId )
                // state.active = null
                state.list.splice(index, 1)
            }))

            set(() => ({
                active: null
            }))
        }
        return res
    },

    clear: () => {
        set(() => ({
            active: null,
            list: []
        }))
    }
}))