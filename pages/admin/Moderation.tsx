
import React, { useState } from 'react';
import { 
  ShieldAlert, ShieldCheck, Filter, Search, Clock, MessageSquare, 
  ShoppingBag, MapPin, MoreHorizontal, EyeOff, Trash2, UserX, CheckCircle2 
} from 'lucide-react';
import { moderationQueue } from '../../services/mockData';
import { ModerationItem } from '../../types';

const Moderation: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<ModerationItem | null>(moderationQueue[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'approve' | 'hide' | 'delete'>('approve');

  const openModal = (type: 'approve' | 'hide' | 'delete') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in slide-in-from-bottom-4 duration-500">
      {/* 待审核队列 */}
      <div className="lg:w-1/3 bg-white rounded-3xl shadow-sm border border-slate-100 flex flex-col h-[650px]">
        <div className="p-4 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-black text-slate-800 text-sm">审核队列 ({moderationQueue.length})</h3>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-50 rounded-lg text-slate-400"><Filter className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2 no-scrollbar">
          {moderationQueue.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedItem?.id === item.id 
                ? 'bg-indigo-50 border-indigo-200 shadow-sm' 
                : 'bg-white border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                  item.riskLevel === 'high' ? 'bg-rose-100 text-rose-600' : 
                  item.riskLevel === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.riskLevel === 'high' ? '高风险' : item.riskLevel === 'medium' ? '中风险' : '低风险'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {item.timestamp.split(' ')[1]}
                </span>
              </div>
              <h4 className="font-bold text-sm truncate text-slate-800">{item.title}</h4>
              <div className="flex items-center justify-between mt-3 text-[10px]">
                <span className="text-slate-500 font-bold">{item.author.name}</span>
                {item.reportCount > 0 && (
                  <span className="text-rose-500 font-black flex items-center gap-1">
                    <ShieldAlert className="w-3 h-3" /> {item.reportCount} 举报
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 内容工作区 */}
      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
        {selectedItem ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 p-3 rounded-2xl text-indigo-500">
                  {selectedItem.source === 'forum' ? <MessageSquare /> : selectedItem.source === 'market' ? <ShoppingBag /> : <MapPin />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-800">{selectedItem.title}</h3>
                  <p className="text-slate-400 text-xs mt-0.5">ID: {selectedItem.id} | 模块: {selectedItem.source}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <p className="text-slate-700 leading-relaxed text-lg whitespace-pre-wrap">{selectedItem.content}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <img src={selectedItem.author.avatar} className="w-12 h-12 rounded-2xl object-cover" />
                  <div>
                    <p className="text-xs text-slate-400 font-bold">发布人</p>
                    <p className="font-black text-slate-800">{selectedItem.author.name}</p>
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                   <div className="bg-green-50 p-3 rounded-xl text-green-600"><ShieldCheck /></div>
                   <div>
                     <p className="text-xs text-slate-400 font-bold">信用分</p>
                     <p className="font-black text-slate-800">{selectedItem.author.creditScore}</p>
                   </div>
                </div>
              </div>

              <div className="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex items-start gap-4">
                <ShieldAlert className="w-6 h-6 text-rose-500 mt-1" />
                <div>
                  <h4 className="font-bold text-rose-800">AI 风险建议</h4>
                  <p className="text-xs text-rose-600 mt-1">检测到疑似敏感词汇，建议人工核实。</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex gap-3">
                <button onClick={() => openModal('hide')} className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm flex items-center gap-2"><EyeOff className="w-4 h-4" /> 隐藏</button>
                <button onClick={() => openModal('delete')} className="px-5 py-2.5 bg-rose-50 text-rose-600 rounded-xl font-bold text-sm flex items-center gap-2"><Trash2 className="w-4 h-4" /> 删除</button>
              </div>
              <div className="flex gap-3">
                 <button className="px-5 py-2.5 bg-orange-50 text-orange-700 rounded-xl font-bold text-sm flex items-center gap-2"><UserX className="w-4 h-4" /> 处罚用户</button>
                 <button onClick={() => openModal('approve')} className="px-8 py-2.5 bg-indigo-600 text-white rounded-xl font-black text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> 通过审核</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300">
            <ShieldCheck className="w-20 h-20 mb-4 opacity-10" />
            <p className="font-bold">请选择待审核项目</p>
          </div>
        )}
      </div>

      {/* 审核处理弹窗 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative z-10">
            <h3 className="text-xl font-black text-slate-800 mb-2">确认提交审核</h3>
            <textarea 
               className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none mt-4"
               placeholder="请输入处理意见 (必填)..."
            />
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold">取消</button>
              <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black shadow-lg">提交结果</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Moderation;
