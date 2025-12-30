
import React from 'react';
import { Database, HardDrive, ShieldCheck } from 'lucide-react';

const Config: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="md:col-span-2 space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="font-black text-slate-800 mb-6">核心业务开关</h3>
          <div className="space-y-4">
            {[
              { label: '二手市场模块', active: true },
              { label: '失物招领模块', active: true },
              { label: '论坛讨论模块', active: true },
              { label: '实时聊天系统', active: false },
            ].map((cfg, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <span className="font-bold text-slate-700">{cfg.label}</span>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${cfg.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${cfg.active ? 'left-7' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
           <h3 className="font-black text-slate-800 mb-6">内容安全参数</h3>
           <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700">自动审核敏感度</label>
              <input type="range" className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              <p className="text-xs text-slate-400 mt-2">敏感度越高，拦截内容越多，可能增加误判率。</p>
           </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
           <h3 className="font-black text-slate-800 mb-6 flex items-center gap-2"><Database className="w-5 h-5 text-indigo-500" /> 系统状态</h3>
           <div className="space-y-4 text-sm">
             <div className="flex justify-between">
               <span className="text-slate-500 font-medium">CPU 使用率</span>
               <span className="font-black">18%</span>
             </div>
             <div className="flex justify-between">
               <span className="text-slate-500 font-medium">内存已占用</span>
               <span className="font-black">4.2 GB</span>
             </div>
             <div className="flex justify-between">
               <span className="text-slate-500 font-medium">API 响应</span>
               <span className="font-black text-green-500">24ms</span>
             </div>
           </div>
        </div>
        <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4" /> 更新配置生效
        </button>
      </div>
    </div>
  );
};

export default Config;
