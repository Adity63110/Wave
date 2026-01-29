
export interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  walletAddress: string;
  bio?: string;
  isVerified?: boolean;
  isOnline?: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  reposts: number;
  comments: number;
  views: string;
  image?: string;
  tokens?: TokenTag[];
}

export interface TokenTag {
  symbol: string;
  price: string;
  change: string;
  isPositive: boolean;
}

export interface Community {
  id: string;
  name: string;
  handle: string;
  description: string;
  members: string;
  online: string;
  banner: string;
  avatar: string;
  isVerified?: boolean;
  category: string;
}

export interface AlphaCall {
  id: string;
  token: string;
  tokenName: string;
  entry: string;
  target?: string;
  roi: string;
  status: 'HIT' | 'MISS' | 'LIVE';
  timestamp: string;
  image?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isMe: boolean;
  isMedia?: boolean;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}
