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
