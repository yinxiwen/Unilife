
export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'teacher' | 'admin';
  college: string;
  creditScore: number;
  verified: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  seller: User;
  status: 'active' | 'sold' | 'auditing';
  description: string;
  createdAt: string;
}

export interface LostItem {
  id: string;
  type: 'lost' | 'found';
  title: string;
  location: string;
  date: string;
  image?: string;
  description: string;
  matchScore?: number; // AI calculated match
  status: 'open' | 'resolved';
  user: User;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  category: 'study' | 'life' | 'confession' | 'club';
  likes: number;
  comments: number;
  author: User;
  isTop?: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'system' | 'transaction' | 'match';
  message: string;
  read: boolean;
  date: string;
}

export interface ModerationItem {
  id: string;
  source: 'market' | 'lostfound' | 'forum';
  title: string;
  content: string;
  author: User;
  riskLevel: 'low' | 'medium' | 'high';
  reportCount: number;
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected' | 'hidden';
}

export interface SystemLog {
  id: string;
  operator: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
  status: 'success' | 'error' | 'warning';
}
