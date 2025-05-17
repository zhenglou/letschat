

// Types for user
export type User = {
    id: number
    avatar: string
    username: string
    token: string
    email: string
}
export type User2 = {
    id: number
    name: string
    token: string
}
export type User3 = {
    token: string,
    userInfo: {
        name: string,
        age: number,
        _id: string
    }
}

export type UserSummary = {
    _id: string | number
    name: string
    age?: number
}
export type UserSummary2 = {
    _id: string
    name: string
    age: number

}
export type FriendshipType = {
    _id?: string | null | string;
    requester: string;
    recipient: string;
    status?: 'pending' | 'accepted' | 'blocked';
    createdAt?: Date;
    updatedAt?: Date;
}

export interface FriendRequest {
    recipientId: string;
    requesterId: string;
    message?: number;
}
// Types for message
export enum MessageType {
    Notice = "notice",
    Chat = "chat",
    Group = "group",
    GroupSend = "group-chat"
}

export enum ContentType {
    Text = "text",
    Emoji = "emoji",
    Image = "image"
}


export enum ChatType {
    Single = "single",
    Group = "group"
}

// export type Chat = {
//     id: string
//     type: ChatType
//     name: string
//     owner: UserSummary
//     desc: string
//     members: Array<UserSummary>
//     history: Array<Message>
// }

export type SingleChat = {
    type: ChatType.Single
    id: string
    from: UserSummary
    to: UserSummary
    history: Array<Message>
}

export type GroupChat = {
    type: ChatType.Group
    id: string
    group: Group
    history: Array<GroupSendMessage>
}

export type Group = {
    _id: string,
    groupName: string,
    desc: string,
    owner: UserSummary
    members: Array<UserSummary>
}
export type GroupSummary = {
    _id: string,
    groupName: string,
    desc?: string,
    owner: string
    members: Array<String | number>
}

export type Chat = SingleChat | GroupChat

export type Message = {
    type: MessageType

    from: UserSummary
    to: UserSummary

    chatType: ChatType
    chatId: string

    contentType: ContentType
    content: string

    date?: string | number
}
export type GroupMessage = {
    type: MessageType.Group
    groupId: string | number
    date?: string | number
}


export type Content = {
    type: ContentType
    value: string
}
export type GroupSendMessage = {
    type: MessageType.GroupSend
    chatType: ChatType
    contentType: ContentType
    from: UserSummary
    groupId:string|number
    groupName:string
    desc:string
    owner:UserSummary
    members: Array<UserSummary>
    content: string
    date?: string | number
  }
type UnifiedMessage =
  | { type: "single"; to: string; chatId: string }
  | { type: "group"; groupId: string; members: string[] };
