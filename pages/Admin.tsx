import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { ShieldAlert, Users, Activity } from 'lucide-react';

const data = [
  { name: '周一', items: 40, traffic: 2400 },
  { name: '周二', items: 30, traffic: 1398 },
  { name: '周三', items: 20, traffic: 9800 },
  { name: '周四', items: 27, traffic: 3908 },
  { name: '周五', items: 18, traffic: 4800 },
  { name: '周六', items: 23, traffic: 3800 },
  { name: '周日', items: 34, traffic: 4300 },
];

const Admin: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold text-gray-800">管理员仪表盘</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 p-3 rounded-full text-blue-600"><Users /></div>
                <span className="text-green-500 text-sm font-bold">+12%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">总用户数</h3>
            <p className="text-2xl font-bold text-gray-800">24,593</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                 <div className="bg-red-100 p-3 rounded-full text-red-600"><ShieldAlert /></div>
                 <span className="text-red-500 text-sm font-bold">5 待处理</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">内容风控 (AI)</h3>
            <p className="text-2xl font-bold text-gray-800">12</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
                 <div className="bg-purple-100 p-3 rounded-full text-purple-600"><Activity /></div>
                 <span className="text-green-500 text-sm font-bold">+5%</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">日活跃用户 (DAU)</h3>
            <p className="text-2xl font-bold text-gray-800">1,204</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-6 text-gray-800">周访问量趋势</h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Line type="monotone" dataKey="traffic" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5' }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-6 text-gray-800">商品发布统计</h3>
             <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                        <Bar dataKey="items" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
