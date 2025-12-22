import React from 'react';
import { useParams } from 'react-router-dom';
import { lostItems } from '../services/mockData';
import { MapPin, Calendar, Search, Shield, UserCheck, MessageSquare } from 'lucide-react';

const LostFoundDetail: React.FC = () => {
  const { id } = useParams();
  const item = lostItems.find(i => i.id === id);

  if (!item) {
    return <div className="p-8 text-center">信息不存在</div>;
  }

  return (
    <div className="bg-white min-h-[80vh] md:pb-0 animate-in slide-in-from-right duration-300 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:p-12">
       {/* 
        NOTE: The mobile header with back button was removed. 
        It is now handled by Layout.tsx.
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 md:mt-0">
        {/* Map / Image Area */}
        <div className="space-y-6">
            <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden relative">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                     <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 flex-col">
                        <Search className="w-12 h-12 opacity-20 mb-2" />
                        <span className="text-sm">未提供照片</span>
                     </div>
                )}
                 <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm ${item.type === 'lost' ? 'bg-orange-500' : 'bg-green-500'}`}>
                    {item.type === 'lost' ? '寻物' : '招领'}
                </div>
            </div>

            {/* Simulated Map */}
            <div className="bg-indigo-50 rounded-xl p-4 flex items-center gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-indigo-600">
                    <MapPin className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs text-indigo-400 font-bold uppercase">最后出现地点</p>
                    <p className="font-bold text-indigo-900 text-lg">{item.location}</p>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-0 flex flex-col h-full">
            <div className="flex-1 pb-24 md:pb-0">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h1>
                <p className="text-gray-500 text-sm flex items-center gap-2 mb-8">
                    <Calendar className="w-4 h-4" /> {item.date}
                </p>

                <div className="prose text-gray-700 mb-8">
                    <h3 className="text-sm font-bold text-gray-900 mb-2">详细描述</h3>
                    <p className="text-base leading-relaxed">{item.description}</p>
                </div>
                
                {item.matchScore && (
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 p-4 rounded-xl mb-8">
                        <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                            <Shield className="w-5 h-5" />
                            <span>AI 智能匹配度: {item.matchScore}%</span>
                        </div>
                        <p className="text-xs text-green-600">系统发现该物品与数据库中的描述高度吻合。</p>
                    </div>
                )}

                {/* Publisher Info */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <img src={item.user.avatar} className="w-12 h-12 rounded-full" alt="User" />
                        <div>
                            <p className="text-sm font-bold text-gray-800">{item.user.name}</p>
                            <p className="text-xs text-gray-400">发布者</p>
                        </div>
                    </div>
                    <button className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200">
                        <MessageSquare className="w-4 h-4" /> 私信
                    </button>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:static md:border-0 md:p-0 md:bg-transparent shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-transform active:scale-[0.98]">
                    <MessageSquare className="w-5 h-5" /> 联系Ta
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default LostFoundDetail;