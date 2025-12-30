
import React from 'react';
import { Search, Info } from 'lucide-react';
import { systemLogs } from '../../services/mockData';

const Logs: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-500">
      <div className="p-6 border-b border-slate-50 flex items-center justify-between">
        <h3 className="font-black text-slate-800">实时系统日志监控</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input type="text" placeholder="关键词搜索..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-xs w-64" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest">
            <tr>
              <th className="px-6 py-4">时间</th>
              <th className="px-6 py-4">操作员</th>
              <th className="px-6 py-4">动作</th>
              <th className="px-6 py-4">目标</th>
              <th className="px-6 py-4">IP</th>
              <th className="px-6 py-4">状态</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {systemLogs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-[11px] font-mono text-slate-400">{log.timestamp}</td>
                <td className="px-6 py-4 font-bold text-xs text-slate-800">{log.operator}</td>
                <td className="px-6 py-4 text-xs text-slate-600">{log.action}</td>
                <td className="px-6 py-4 text-xs text-slate-400">{log.target}</td>
                <td className="px-6 py-4 text-[10px] font-mono text-slate-400">{log.ip}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    log.status === 'success' ? 'bg-green-100 text-green-600' : 
                    log.status === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                  }`}>
                    {log.status === 'success' ? '成功' : log.status === 'warning' ? '告警' : '错误'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 text-center flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold">
        <Info className="w-3 h-3" /> 数据统计报表每 5 分钟更新一次，支持导出 CSV
      </div>
    </div>
  );
};

export default Logs;
