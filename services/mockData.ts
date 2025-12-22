
import { Product, LostItem, Post, User } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: '李明',
  avatar: 'https://picsum.photos/seed/alex/100/100',
  role: 'student',
  college: '计算机学院',
  creditScore: 780,
  verified: true
};

export const allUsers: User[] = [
  currentUser,
  { id: 'u2', name: '张伟', avatar: 'https://picsum.photos/seed/zhang/100/100', role: 'student', college: '经管学院', creditScore: 820, verified: true },
  { id: 'u3', name: '王强', avatar: 'https://picsum.photos/seed/wang/100/100', role: 'student', college: '艺术学院', creditScore: 650, verified: true },
  { id: 'u4', name: '图书管理员', avatar: 'https://picsum.photos/seed/lib/100/100', role: 'teacher', college: '校图书馆', creditScore: 999, verified: true },
  { id: 'u5', name: '陈静', avatar: 'https://picsum.photos/seed/chen/100/100', role: 'student', college: '外语学院', creditScore: 790, verified: true },
  { id: 'u6', name: '吃货小刘', avatar: 'https://picsum.photos/seed/liu/100/100', role: 'student', college: '医学院', creditScore: 720, verified: true },
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'MacBook Pro M1 2020',
    price: 5800,
    image: 'https://picsum.photos/seed/macbook/400/300',
    category: '数码',
    seller: allUsers[1],
    status: 'active',
    description: '九成新，电池健康度98%。原装充电器都在。',
    createdAt: '2小时前'
  },
  {
    id: 'p2',
    title: '微积分教材 第五版',
    price: 25,
    image: 'https://picsum.photos/seed/book/400/300',
    category: '图书',
    seller: allUsers[2],
    status: 'active',
    description: '无笔记，保存良好。',
    createdAt: '5小时前'
  },
  {
    id: 'p3',
    title: '九号电动滑板车',
    price: 800,
    image: 'https://picsum.photos/seed/scooter/400/300',
    category: '交通',
    seller: allUsers[3],
    status: 'sold',
    description: '可折叠，续航20公里。',
    createdAt: '1天前'
  }
];

export const lostItems: LostItem[] = [
  {
    id: 'l1',
    type: 'found',
    title: '黑色索尼耳机',
    location: '图书馆三楼',
    date: '2023-10-24 14:30',
    image: 'https://picsum.photos/seed/headphones/400/300',
    description: '在靠窗的34号桌发现的。',
    matchScore: 92,
    status: 'open',
    user: allUsers[3]
  },
  {
    id: 'l2',
    type: 'lost',
    title: '蓝色保温杯',
    location: '体育馆',
    date: '2023-10-23 10:15',
    description: '膳魔师品牌，上面贴了个猫咪贴纸。',
    status: 'open',
    user: currentUser
  }
];

export const posts: Post[] = [
  {
    id: 'po1',
    title: '期末算法复习小组',
    content: '这就周末有人想一起复习算法导论吗？图书馆204研讨室。',
    category: 'study',
    likes: 45,
    comments: 12,
    author: allUsers[4],
    isTop: true,
    createdAt: '1小时前'
  }
];
