
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  BarChart3, ShieldAlert, Settings, FileText
} from 'lucide-react';

const Admin: React.FC = () => {
  const navTabs = [
    { id: 'stats', label: '数据统计', icon: BarChart3, path: '/admin/stats' },
    { id: 'moderation', label: '内容审核', icon: ShieldAlert, path: '/admin/moderation' },
    { id: 'config', label: '系统配置', icon: Settings, path: '/admin/config' },
    { id: 'logs', label: '日志监控', icon: FileText, path: '/admin/logs' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      {/* 顶部标题与导航栏 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">管理后台</h2>
          <p className="text-slate-500 text-sm mt-1">智慧校园平台运营支撑系统</p>
        </div>
        
        <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar">
          {navTabs.map(tab => (
            <NavLink
              key={tab.id}
              to={tab.path}
              className={({ isActive }) => 
                `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-50'
                }`
              }
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </NavLink>
          ))}
        </div>
      </div>

      {/* 子模块内容渲染区域 */}
      <div className="min-h-[600px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
