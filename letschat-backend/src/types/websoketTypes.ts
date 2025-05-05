export interface WebSocketMessage {
  type: 'friend_request' | 'auth';
  data: any;
  token?: string;
  status?: string;
}