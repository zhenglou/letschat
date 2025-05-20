export interface WebSocketMessage {
  type: 'friend_request' | 'auth' | 'accept_friend_request';
  data?: any;
  token?: string;
  status?: string;
}