
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Users, ShieldAlert, Activity, HardDrive, ShoppingBag } from 'lucide-react';

const chartData = [
  { name: '周一', items: 40, traffic: 2400, active: 400 },
  { name: '周二', items: 30, traffic: 1398, active: 300 },
  { name: '周三', items: 20, traffic: 9800, active: 500 },
  { name: '周四', items: 27, traffic: 3908, active: 280 },
  { name: '周五', items: 18, traffic: 4800, active: 320 },
  { name: '周六', items: 23, traffic: 3800, active: 600 },
  { name: '周日', items: 34, traffic: 4300, active: 700 },
];

const Stats: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '总用户数', value: '24,593', change: '+12%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '待审核项', value: '12', change: '需处理', icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
          { label: '昨日成交', value: '¥ 4,520', change: '+8%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: '存储占用', value: '78%', change: '健康', icon: HardDrive, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-slate-800">{stat.value}</span>
                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-slate-400'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-slate-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              活跃趋势监控
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="traffic" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorTraffic)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-800 mb-8 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose-500" />
            交易与发布分析
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="items" fill="#f43f5e" radius={[6, 6, 0, 0]} barSize={20} />
                <Bar dataKey="active" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
