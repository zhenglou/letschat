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

export type UserSummary = {
  _id: string
  username: string
  avatar: string
}
export type Message = {
  type: MessageType

  from: UserSummary
  to: UserSummary

  chatType: ChatType
  chatId: string

  contentType: ContentType
  content: string

  date?: string
}
export type GroupMessage = {
  type: MessageType.Group
  groupId: string | number
  date?: string | number
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
export type Chat = SingleChat | GroupChat
