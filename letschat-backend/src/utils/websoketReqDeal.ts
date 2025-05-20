import { general } from "@/services/friendshipsService";
import { FriendshipType } from '@/types/friendShips';
import { WebSocketMessage } from '@/types/websoketTypes'
import { WebSocket } from 'ws';
import { listFriendshipDetail } from "@/services/friendshipsService";
import { redisPublisher, redisSubscriber } from "@/config/redis";
import { GroupMessage, Message,GroupSendMessage } from "@/types/messageType";
export const dealFriendShips = function (activeConnections: Map<string, WebSocket>, parsedMessage: WebSocketMessage) {
  let confirmConnect = 0;
  activeConnections.forEach(async (conn, id) => {
    if (id == parsedMessage.data.recipient) {
      console.log("好友在线");
      confirmConnect = 1;
      const generalData: FriendshipType = {
        requester: parsedMessage.data.requester,
        recipient: parsedMessage.data.recipient,
        status: 'pending'
      }
      try {
        const friendshipInfos = await listFriendshipDetail(parsedMessage.data);
        conn.send(JSON.stringify({ type: 'friend_request', data: { fsRaw: generalData, fs: await general(generalData), fsDetail: friendshipInfos } }));
        console.log("在线发送成功");
      } catch (err) {
        console.log("重复请求 ");
      }

    }
  });
  if (confirmConnect == 0) {
    console.log("好友未在线");
    const generalData: FriendshipType = {
      requester: parsedMessage.data.requester,
      recipient: parsedMessage.data.recipient,
      status: 'pending'
    }
    general(generalData).then((res) => {
      console.log(res, "离线入库");
    }).catch(err => {
      console.log("create duplicate");
    })
  }
}
export const dealSingleMessage = function (activeConnections: Map<string, WebSocket>, parsedMessage: Message) {
  console.log(parsedMessage, "收到消息");

  // 检查消息是否包含必要字段
  if (parsedMessage.to && parsedMessage.to._id) {

    const recipientId = parsedMessage.to._id;
    const requestId = parsedMessage.from._id;
    console.log("转发消息");

    // 通过Redis发布消息到接收者的频道
    redisPublisher.publish(`chat:${recipientId}`, JSON.stringify(parsedMessage));
    redisPublisher.publish(`chat:${requestId}`, JSON.stringify(parsedMessage));

    // 如果接收者在线，直接通过WebSocket发送
    // activeConnections.forEach((conn, id) => {
    //   if (id === recipientId) {
    //     conn.send(JSON.stringify({ 
    //       type: 'chat', 
    //       data: parsedMessage 
    //     }));
    //   }
    // });
  }
}
export const dealGroupMessage = async function (activeConnections: Map<string, WebSocket>, parsedMessage: GroupMessage) {
  console.log(parsedMessage, "收到创建群频道消息");
   await redisSubscriber.subscribe(`group:${parsedMessage.groupId}`, (rawMessage: string) => {
    console.log(rawMessage, "完成转发");
  });
  redisPublisher.publish(`group:${parsedMessage.groupId}`,"123456")  
}
export const dealGroupMessageSend = async function (activeConnections: Map<string, WebSocket>, parsedMessage: GroupSendMessage) {
  console.log(parsedMessage, "收到群聊消息");
  const onlineMembers = parsedMessage.members.filter(member => 
    activeConnections.has(member._id)
  );
  onlineMembers.map((m)=>{
    activeConnections.get(m._id)?.send(JSON.stringify(parsedMessage))
  })
}
