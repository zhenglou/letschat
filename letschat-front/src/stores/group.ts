import { UserSummary } from '@/types'
import request, { Result } from '@/utils/request'
import { produce } from 'immer'
import { create } from 'zustand'
import { Group, GroupSummary } from '@/types'
import { createGroup, getGroupList } from '@/apis/groupsApi'
import { useUserStore } from './user'
// const BASE = import.meta.env.VITE_APP_URL


type GroupStore = {
    active: Group | null
    list: Array<Group>
    setActive: (group: Group) => void,
    createGroup: (groupName: string, desc: string, memberIds: Array<number | string>) => Promise<any>
    deleteGroup: (groupId: string) => Promise<any>
    exitGroup: (groupId: string) => Promise<any>
    getList: () => Promise<Array<Group>>
    clear: () => void
}

export const useGroupStore = create<GroupStore>((set, get) => ({
    active: null,
    list: [],

    setActive: (group: Group) => {
        set(() => ({ active: group }))
    },

    createGroup: async (groupName: string, desc: string, memberIds: Array<number | string>) => {
        const status = await createGroup({ groupName, desc, owner: useUserStore.getState().user?.userInfo._id, members: memberIds })
        if (status.code == 200) {
            return status
        }
        return false;
    },

    getList: async () => {
        const res = await getGroupList({ members: useUserStore.getState().user?.userInfo._id })

        if (res.code == 200) {
            console.log('get-group:', res)

            set(() => ({ list:res.data }))
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
            set(produce((state: GroupStore) => {
                const index = state.list.findIndex((e: Group) => e._id === groupId)

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
            set(produce((state: GroupStore) => {
                const index = state.list.findIndex((e: Group) => e._id === groupId)
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