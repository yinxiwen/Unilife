
import { Product, LostItem, Post, User, Notification, ModerationItem, SystemLog } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: '李明',
  avatar: 'https://picsum.photos/seed/alex/100/100',
  role: 'admin', // Changed to admin for testing the dashboard
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
    id: 'p4',
    title: 'iPad Pro 11寸 2021',
    price: 3200,
    image: 'https://picsum.photos/seed/ipad/400/300',
    category: '数码',
    seller: currentUser,
    status: 'active',
    description: '屏幕无划痕，自用闲置。',
    createdAt: '昨天'
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
  },
  {
    id: 'po2',
    title: '今天一食堂的糖醋排骨绝了',
    content: '大家快去吃，晚了就没了！',
    category: 'life',
    likes: 120,
    comments: 34,
    author: currentUser,
    createdAt: '3小时前'
  }
];

export const notifications: Notification[] = [
  { id: 'n1', type: 'match', message: '您的“蓝色保温杯”发现了新的智能匹配，匹配度92%！', read: false, date: '10-24 15:00' },
  { id: 'n2', type: 'transaction', message: '您购买的“微积分教材”订单已完成，请评价。', read: true, date: '10-22 10:30' },
];

export const transactions = [
  { id: 't1', title: '微积分教材', price: 25, type: 'buy', status: '已完成', date: '2023-10-22' },
  { id: 't2', title: 'iPad Pro 11寸', price: 3200, type: 'sell', status: '进行中', date: '2023-10-24' }
];

export const moderationQueue: ModerationItem[] = [
  {
    id: 'm1',
    source: 'forum',
    title: '如何评价最近的食堂涨价？',
    content: '最近食堂的价格越来越贵了，而且分量还变少了，真的受不了。',
    author: allUsers[1],
    riskLevel: 'medium',
    reportCount: 3,
    timestamp: '2023-10-24 10:00',
    status: 'pending'
  },
  {
    id: 'm2',
    source: 'market',
    title: '代写各类论文，保证原创',
    content: '专业代写，硕博团队，价格公道，需要的私信。',
    author: allUsers[2],
    riskLevel: 'high',
    reportCount: 12,
    timestamp: '2023-10-24 11:20',
    status: 'pending'
  },
  {
    id: 'm3',
    source: 'lostfound',
    title: '捡到一个奇怪的包裹',
    content: '在南操场捡到一个写着奇怪符号的黑色包裹，感觉有点吓人。',
    author: allUsers[3],
    riskLevel: 'low',
    reportCount: 1,
    timestamp: '2023-10-24 12:05',
    status: 'pending'
  }
];

export const systemLogs: SystemLog[] = [
  { id: 'log1', operator: 'Admin01', action: '审核通过商品', target: 'MacBook Pro M1', ip: '192.168.1.102', timestamp: '2023-10-24 14:05:22', status: 'success' },
  { id: 'log2', operator: 'System', action: '敏感词拦截', target: '用户ID: u402', ip: 'internal', timestamp: '2023-10-24 14:10:45', status: 'warning' },
  { id: 'log3', operator: 'Admin01', action: '禁用用户', target: '用户ID: u291', ip: '192.168.1.102', timestamp: '2023-10-24 14:15:10', status: 'success' },
  { id: 'log4', operator: 'System', action: '数据库备份失败', target: 'MainDB_Backup', ip: 'internal', timestamp: '2023-10-24 03:00:00', status: 'error' }
];
