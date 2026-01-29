
import { Post, Community, User, AlphaCall, Conversation, Message } from './types';

export const MOCK_USER: User = {
  id: 'u1',
  name: 'CryptoWhale.sol',
  handle: 'cryptowhale',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjtB7Gk4BR9wysiGceFq51WNH22TRT-A3FJs6y9nJOoeOJqB3HyLFsm6yig-d_-0VNYT5GkauI1jUmgE_NKR-aQGPmKKtBKNJsaMelN4kQSwcAmtIeXUo-TGMYe1OUIrQQ1CzHNePGtJsDrFAbnKUR3NdVxxXndcx95VBcj9jbyOByJWJMDkdzO7yohOwC_KLzNO1tha3T_f2DJuzT3kh-fsBcyKiuf3OBCWEMZRoGOs2NKPKLYDZHU8-0exHXGbdWh6KM62Z7fzUH',
  walletAddress: '0x71C...3E4A',
  bio: 'Early adopter of $PEPE and $BONK. Solana maximalist. Diamond hands only. Hunting for the next 100x gem on Raydium. 💎 🚀',
  isVerified: true,
  isOnline: true,
};

export const OTHER_MOCK_USERS: User[] = [
  {
    id: 'u2',
    name: 'SolanaLegend',
    handle: 'sol_leg',
    avatar: 'https://picsum.photos/seed/legend/200',
    walletAddress: '0x...123',
    bio: 'Trading since genesis. SOL alpha only.',
    isVerified: true,
  },
  {
    id: 'u10',
    name: 'AnatolyT',
    handle: 'aeyakovenko',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkR7ElegqF7scESSSmgl7bqD6yfavqJLo5q42JstK7gcaqN6Bfz95LATHR90QBlNymc45Ky7b5p_dykPVID9PDe-grXj5hiv8A-CQ7rJTH-tVnZG_X3OUMdYvQsR55W3yLIF4gKIDJJVk30MUUG_faB8Y2JQ-1UIt1UMPCWUEkLbXRXOXp30GlrTownYhlQxa8TU-nazv7WErvtE6Fdz8WcXHelYSyksxV6ym84GiOJ36oiNHzgGunfqzb9AiSF-vFoby15T_LdL2a',
    walletAddress: 'toly.sol',
    bio: 'Founder of Solana.',
    isVerified: true,
  }
];

export const getUserByHandle = (handle: string): User => {
  if (handle === MOCK_USER.handle) return MOCK_USER;
  const found = OTHER_MOCK_USERS.find(u => u.handle === handle);
  if (found) return found;
  return {
    id: 'unknown',
    name: handle,
    handle: handle,
    avatar: `https://picsum.photos/seed/${handle}/200`,
    walletAddress: '0x...unknown',
  };
};

export const MOCK_CALLS: AlphaCall[] = [
  {
    id: 'c1',
    token: '$dogwifhat',
    tokenName: 'WIF',
    entry: '$0.22',
    target: '$0.45',
    roi: '+120.4%',
    status: 'HIT',
    timestamp: '2d ago',
  },
  {
    id: 'c2',
    token: '$BONK',
    tokenName: 'BONK',
    entry: '$0.000012',
    target: '$0.000025',
    roi: '+45.8%',
    status: 'HIT',
    timestamp: '4d ago',
  },
  {
    id: 'c3',
    token: '$PYTH',
    tokenName: 'PYTH',
    entry: '$0.45',
    roi: '-12.3%',
    status: 'MISS',
    timestamp: '1w ago',
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'p0',
    author: MOCK_USER,
    content: 'Just loaded up more $SOL. Ecosystem is thriving.',
    timestamp: '12m',
    likes: 452,
    reposts: 124,
    comments: 82,
    views: '125K',
  }
];

export const MOCK_CONVERSATIONS: Conversation[] = [];
export const MOCK_MESSAGES: Message[] = [];
export const MOCK_COMMUNITIES: Community[] = [];
