import toast from "react-hot-toast";
const WS_URL = process.env.SERVER_URL || "ws://localhost:3000'"
console.log(WS_URL);

import { WebSocketMessage } from '@/types/websoketTypes'
import { useFriendStore } from '@/stores/friend';
import { Chat, ChatType, FriendshipType, GroupChat, SingleChat, UserSummary } from "@/types";
import { Message, MessageType, GroupMessage, GroupSendMessage } from '@/types'
import { useMessageStore } from "@/stores/message";
import { useUserStore } from "@/stores/user";
export default class WebSocketClient {
  private ws: WebSocket | null = null;
  private token: string;
  constructor(token: string) {
    this.token = token;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(WS_URL);

    this.ws.onopen = () => {
      console.log("连接成功");

      // 发送认证 Token
      this.send({ type: 'auth', token: this.token });
    };

    this.ws.onmessage = (event) => {
      const message: any = JSON.parse(event.data);
      if (!message) {
        toast.error('连接失败')
        return;
      }
      if (message.type === 'friend_request') {
        console.log("friend_request");

        this.handleFriendRequest(message.data);
      }
      if (message.type === 'auth') {
        console.log(message.status);
      }
      if (message.type === 'chat' && message.chatType === 'single') {
        this.dealMessage(message)
      }
      if (message.type === 'group-chat') {
        this.dealGroupMessage(message)

      }
    };

    this.ws.onclose = () => {
      console.log('连接断开，尝试重连...');
      setTimeout(() => this.connect(), 3000);
    };
  }
  dealMessage(message: Message) {
    console.log("进入单聊消息处理", message);
    const { chatId, chatType, from, to, contentType, content, date } = message
    // const chatList = useMessageStore.getState().chatList
    let chatFrom = from, chatTo = to;

    if (!(from._id == useUserStore.getState().user?.userInfo._id)) {
      let temp = from;
      chatFrom = to;
      chatTo = temp;
    }

    const newChat: SingleChat = {
      type: ChatType.Single,
      id: chatId,
      from: chatFrom,
      to: chatTo,
      history: []
    }
    console.log("处理后", newChat);

    const chat = useMessageStore.getState().addChat(newChat);
    (chat as SingleChat).history.push(message)
    useMessageStore.getState().setActive(chat);
  }
  dealGroupMessage(message: GroupSendMessage) {
    console.log("进入群聊消息处理", message);
    const chatId = String(message.groupId)
    let groupChat = useMessageStore.getState().findChat(chatId);
    if (groupChat === undefined) {
      groupChat = {
        type: ChatType.Group,
        id: chatId,
        group: {
          _id: chatId,
          groupName: message.groupName,
          desc: message.desc,
          owner: message.owner,
          members: message.members
        },
        history: []
      }
    }
    (groupChat as GroupChat).history.push(message)
    const exist = useMessageStore.getState().addChat(groupChat)
    useMessageStore.getState().setActive(exist)

  }
  send(data: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
  sendMessage(data: Message | GroupSendMessage | GroupMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.log("发送消息", data);
      this.ws.send(JSON.stringify(data));
    }
  }

  private handleFriendRequest(data: any) {
    console.log('收到好友请求:', data);

    // 将好友请求数据存储到friend store的currentReq状态中
    const currentReq: UserSummary = {
      _id: data.fsDetail.requesterInfo._id,
      name: data.fsDetail.requesterInfo.name
    };
    const currentReqAndRec: FriendshipType = {
      _id: data.fs._id,
      requester: data.fs.requester,
      recipient: data.fs.recipient,
      status: 'accepted'
    }
    useFriendStore.setState({ currentReq, currentReqAndRec });
  }
}