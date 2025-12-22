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

export const products: Product[] = [
  {
    id: 'p1',
    title: 'MacBook Pro M1 2020',
    price: 5800,
    image: 'https://picsum.photos/seed/macbook/400/300',
    category: '数码',
    seller: currentUser,
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
    seller: { ...currentUser, id: 'u2', name: '张伟' },
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
    seller: { ...currentUser, id: 'u3', name: '王强' },
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
    date: '2023-10-24',
    image: 'https://picsum.photos/seed/headphones/400/300',
    description: '在靠窗的34号桌发现的。',
    matchScore: 92,
    status: 'open',
    user: { ...currentUser, id: 'u4', name: '图书管理员' }
  },
  {
    id: 'l2',
    type: 'lost',
    title: '蓝色保温杯',
    location: '体育馆',
    date: '2023-10-23',
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
    category: 'study', // 保持英文key用于逻辑，或者前端映射，这里为了简单直接对应前端标签
    likes: 45,
    comments: 12,
    author: { ...currentUser, id: 'u5', name: '陈静' },
    isTop: true,
    createdAt: '1小时前'
  },
  {
    id: 'po2',
    title: '哪个食堂最好吃？',
    content: '不接受反驳，北区食堂的辣子鸡就是坠吊的。',
    category: 'life',
    likes: 120,
    comments: 56,
    author: { ...currentUser, id: 'u6', name: '吃货小刘' },
    createdAt: '3小时前'
  }
];
