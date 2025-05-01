import { Chat, User } from "@/types";

// type UserStore = {
//     set: (user:User) => void
//     delete: () => void
//     get: () => User | null
// }

const STORAGE = sessionStorage
const MAX = 100

export const userStorage = {
    set: (user:User) => {
        STORAGE.setItem('user', JSON.stringify(user))
    },
    delete: () => {
        STORAGE.removeItem('user')
    },
    get: () => {
        const userString = STORAGE.getItem('user')
    
        if (userString === null) return null
    
        return JSON.parse(userString)
    }
}

export const chatStorage = {
    NAME: 'chat.list',
    fist: () => {
        const list = chatStorage.getList()
        return list.length ? list[0] : null
    },
    setList: (list: Array<Chat>) => {
        if (list.length > MAX) list.length = MAX
        STORAGE.setItem(chatStorage.NAME, JSON.stringify(list))
    },
    getList: () => {
        const listString = STORAGE.getItem(chatStorage.NAME)

        if (listString === null) return []

        return JSON.parse(listString) as Array<Chat>
    },
    clear: () => {
        STORAGE.removeItem(chatStorage.NAME)
    }
}

// export const groupStorage = {
//     fist: () => {
//         const list = groupStorage.getList()
//         return list.length ? list[0] : null
//     },
//     setList: (list: Array<Group>) => {
//         if (list.length > MAX) list.length = MAX
//         STORAGE.setItem('group.list', JSON.stringify(list))
//     },
//     getList: () => {
//         const listString = STORAGE.getItem('group.list')

//         if (listString === null) return []

//         return JSON.parse(listString) as Array<Group>
//     }
// }
