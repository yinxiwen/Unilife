
import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area 
} from 'recharts';
import { 
  ShieldAlert, Users, Activity, BarChart3, ShieldCheck, Settings, FileText, 
  Search, Filter, ChevronRight, CheckCircle2, XCircle, AlertCircle, EyeOff, Trash2, 
  UserX, Ban, MessageSquare, ShoppingBag, MapPin, MoreHorizontal, Clock, Database, HardDrive
} from 'lucide-react';
import { moderationQueue, systemLogs, allUsers } from '../services/mockData';
import { ModerationItem } from '../types';

const chartData = [
  { name: '周一', items: 40, traffic: 2400, active: 400 },
  { name: '周二', items: 30, traffic: 1398, active: 300 },
  { name: '周三', items: 20, traffic: 9800, active: 500 },
  { name: '周四', items: 27, traffic: 3908, active: 280 },
  { name: '周五', items: 18, traffic: 4800, active: 320 },
  { name: '周六', items: 23, traffic: 3800, active: 600 },
  { name: '周日', items: 34, traffic: 4300, active: 700 },
];

const Admin: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'stats' | 'moderation' | 'config' | 'logs'>('stats');
  const [selectedModerationItem, setSelectedModerationItem] = useState<ModerationItem | null>(moderationQueue[0]);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [processType, setProcessType] = useState<'approve' | 'hide' | 'delete'>('approve');

  const navTabs = [
    { id: 'stats', label: '数据统计', icon: BarChart3 },
    { id: 'moderation', label: '内容审核', icon: ShieldAlert },
    { id: 'config', label: '系统配置', icon: Settings },
    { id: 'logs', label: '日志监控', icon: FileText },
  ];

  const handleProcess = (type: 'approve' | 'hide' | 'delete') => {
    setProcessType(type);
    setIsProcessModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">管理后台</h2>
          <p className="text-slate-500 text-sm mt-1">智慧校园平台运营支撑系统</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
          {navTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveModule(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeModule === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- 1. 数据统计模块 --- */}
      {activeModule === 'stats' && (
        <div className="space-y-6">
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
                <select className="bg-slate-50 border-none rounded-lg text-xs font-bold px-3 py-1.5 focus:ring-0">
                  <option>最近7天</option>
                  <option>最近30天</option>
                </select>
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
      )}

      {/* --- 2. 内容审核模块 (4.5.4) --- */}
      {activeModule === 'moderation' && (
        <div className="flex flex-col lg:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500">
          {/* Left: Audit Queue */}
          <div className="lg:w-1/3 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[600px]">
            <div className="p-4 border-b border-slate-50 flex items-center justify-between">
              <h3 className="font-black text-slate-800 text-sm">审核队列</h3>
              <div className="flex gap-2">
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Filter className="w-4 h-4" /></button>
                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Search className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
              {moderationQueue.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedModerationItem(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer group ${
                    selectedModerationItem?.id === item.id 
                    ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                    : 'bg-white border-transparent hover:bg-slate-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                      item.riskLevel === 'high' ? 'bg-rose-100 text-rose-600' : 
                      item.riskLevel === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {item.riskLevel === 'high' ? '高风险' : item.riskLevel === 'medium' ? '中风险' : '低风险'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.timestamp.split(' ')[1]}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm truncate ${selectedModerationItem?.id === item.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                    {item.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <img src={item.author.avatar} className="w-4 h-4 rounded-full" />
                      <span className="text-[10px] text-slate-500 font-bold">{item.author.name}</span>
                    </div>
                    {item.reportCount > 0 && (
                      <span className="text-[10px] text-rose-500 font-black flex items-center gap-1">
                         <ShieldAlert className="w-3 h-3" /> {item.reportCount} 次举报
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Content Workspace */}
          <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
            {selectedModerationItem ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-3 rounded-2xl">
                      {selectedModerationItem.source === 'forum' ? <MessageSquare className="w-6 h-6 text-indigo-500" /> : 
                       selectedModerationItem.source === 'market' ? <ShoppingBag className="w-6 h-6 text-rose-500" /> : <MapPin className="w-6 h-6 text-emerald-500" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-slate-800">{selectedModerationItem.title}</h3>
                      <p className="text-slate-400 text-xs flex items-center gap-2 mt-0.5">
                        ID: {selectedModerationItem.id} | 模块: {selectedModerationItem.source} | 时间: {selectedModerationItem.timestamp}
                      </p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors"><MoreHorizontal className="w-5 h-5 text-slate-400" /></button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                    <h4 className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">原文内容</h4>
                    <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">{selectedModerationItem.content}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                      <img src={selectedModerationItem.author.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold">发布人</p>
                        <p className="font-black text-slate-800">{selectedModerationItem.author.name}</p>
                        <p className="text-[10px] text-indigo-500 font-bold">{selectedModerationItem.author.college}</p>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                       <div className={`p-3 rounded-xl ${selectedModerationItem.author.creditScore > 700 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          <Award className="w-6 h-6" />
                       </div>
                       <div>
                         <p className="text-xs text-slate-400 font-bold">用户信用分</p>
                         <p className="font-black text-slate-800">{selectedModerationItem.author.creditScore}</p>
                         <p className="text-[10px] text-slate-400">评分机制 A2-V1</p>
                       </div>
                    </div>
                  </div>

                  <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex items-start gap-4">
                    <ShieldAlert className="w-6 h-6 text-rose-500 mt-1" />
                    <div>
                      <h4 className="font-bold text-rose-800">AI 风险判定结果</h4>
                      <p className="text-xs text-rose-600 mt-1">检测到疑似“违规业务”宣传（代写、金融诈骗等）。建议人工核实其内容真实性。</p>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleProcess('hide')}
                      className="px-6 py-3 bg-slate-100 text-slate-700 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center gap-2"
                    >
                      <EyeOff className="w-4 h-4" /> 隐藏
                    </button>
                    <button 
                      onClick={() => handleProcess('delete')}
                      className="px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm hover:bg-rose-100 transition-all flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> 删除
                    </button>
                  </div>
                  
                  <div className="flex gap-3">
                     <button className="px-6 py-3 bg-orange-100 text-orange-700 rounded-2xl font-bold text-sm hover:bg-orange-200 transition-all flex items-center gap-2">
                        <UserX className="w-4 h-4" /> 处罚用户
                     </button>
                     <button 
                      onClick={() => handleProcess('approve')}
                      className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all flex items-center gap-2"
                    >
                        <CheckCircle2 className="w-4 h-4" /> 审核通过
                     </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
                <ShieldCheck className="w-20 h-20 mb-4 opacity-10" />
                <p className="font-bold">选择一个项目开始审核</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- 3. 系统配置模块 --- */}
      {activeModule === 'config' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="font-black text-slate-800 mb-6">核心模块开关</h3>
              <div className="space-y-4">
                {[
                  { label: '二手交易系统', desc: '控制全校二手交易功能的启用与禁用', active: true },
                  { label: '失物招领中心', desc: 'AI 自动物品匹配算法与发布入口', active: true },
                  { label: '校园论坛模块', desc: '讨论、表白墙及社团公告功能', active: true },
                  { label: '即时通讯系统', desc: '买家卖家在线沟通与通知推送', active: false },
                ].map((cfg, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">{cfg.label}</p>
                      <p className="text-xs text-slate-400 mt-1">{cfg.desc}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${cfg.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${cfg.active ? 'left-7' : 'left-1'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="font-black text-slate-800 mb-6">内容安全参数</h3>
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                       <label className="text-sm font-bold text-slate-700">自动检测敏感度 (AI)</label>
                       <span className="text-indigo-600 font-black text-sm">85%</span>
                    </div>
                    <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">系统保留词库</label>
                    <textarea 
                      className="w-full h-24 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-indigo-500"
                      defaultValue="政治, 暴恐, 违规业务, 色情, 赌博"
                    />
                  </div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
               <h3 className="font-black text-slate-800 mb-6">服务器状态</h3>
               <div className="space-y-4">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500 font-bold">CPU 使用率</span>
                   <span className="text-slate-800 font-black">22%</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[22%] h-full bg-indigo-500"></div>
                 </div>

                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500 font-bold">内存占用</span>
                   <span className="text-slate-800 font-black">4.2GB / 16GB</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[26%] h-full bg-indigo-500"></div>
                 </div>

                 <div className="flex justify-between text-sm">
                   <span className="text-slate-500 font-bold">数据库 IOPS</span>
                   <span className="text-slate-800 font-black">1.2k / s</span>
                 </div>
                 <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="w-[12%] h-full bg-indigo-500"></div>
                 </div>
               </div>
               <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                  <Database className="w-4 h-4" /> 导出系统快照
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- 4. 日志监控模块 --- */}
      {activeModule === 'logs' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="font-black text-slate-800">实时系统日志</h3>
            <div className="flex gap-2">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                 <input type="text" placeholder="搜索操作人/动作" className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs w-64 focus:ring-indigo-500" />
               </div>
               <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all">
                  清空日志
               </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <tr>
                  <th className="px-6 py-4">时间戳</th>
                  <th className="px-6 py-4">操作者</th>
                  <th className="px-6 py-4">行为</th>
                  <th className="px-6 py-4">目标对象</th>
                  <th className="px-6 py-4">IP 地址</th>
                  <th className="px-6 py-4">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {systemLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-[11px] font-mono text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-800">{log.operator}</span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">{log.action}</td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium truncate max-w-[150px]">{log.target}</td>
                    <td className="px-6 py-4 text-[11px] font-mono text-slate-400">{log.ip}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
                        log.status === 'success' ? 'bg-green-100 text-green-600' : 
                        log.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                        {log.status === 'success' ? '正常' : log.status === 'warning' ? '警告' : '异常'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50/30 text-center text-[10px] text-slate-400 font-bold">
            已加载最近 50 条日志，系统支持查询 6 个月内的历史记录
          </div>
        </div>
      )}

      {/* Audit Confirmation Modal */}
      {isProcessModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsProcessModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-slate-800 mb-2">确认操作</h3>
            <p className="text-slate-500 text-sm mb-6">
              {processType === 'approve' ? '确认内容合规，将向全校公示。' : 
               processType === 'hide' ? '内容将不再展示在公共列表，但原作者仍可查看。' : '彻底删除该内容，操作不可撤销。'}
            </p>
            
            <div className="mb-6">
               <label className="block text-xs font-black text-slate-400 uppercase mb-2">处理意见 (必填)</label>
               <textarea 
                  autoFocus
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="输入处理的具体理由，将通过站内信通知用户..."
               />
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsProcessModalOpen(false)}
                className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                取消
              </button>
              <button 
                onClick={() => {
                  setIsProcessModalOpen(false);
                  // Actual logic would refresh list here
                }}
                className={`flex-1 py-4 text-white rounded-2xl font-black shadow-lg transition-all active:scale-[0.98] ${
                  processType === 'approve' ? 'bg-indigo-600 shadow-indigo-100' : 'bg-rose-600 shadow-rose-100'
                }`}
              >
                确定提交
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper component for the award icon since it wasn't imported from lucide
const Award = ({ className }: { className: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/><circle cx="12" cy="8" r="6"/></svg>
);

export default Admin;
