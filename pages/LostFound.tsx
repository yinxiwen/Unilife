import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Search, CheckCircle, Info, Plus } from 'lucide-react';
import { lostItems as initialLostItems } from '../services/mockData';
import { LostItem } from '../types';

const LostFound: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'lost' | 'found'>('lost');
  const [items, setItems] = useState<LostItem[]>(initialLostItems);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const matchesTab = item.type === activeTab;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative min-h-[80vh]">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
            type="text" 
            placeholder={activeTab === 'lost' ? "搜索丢失的物品..." : "搜索捡到的物品..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
        />
      </div>

      {/* Header Card */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-2xl font-bold">失物招领中心</h2>
            <p className="opacity-90 mt-1 text-sm">AI 智能匹配，帮您快速找回遗失物品。</p>
            
            <div className="mt-6 flex bg-white/20 p-1 rounded-xl backdrop-blur-md max-w-sm">
                <button 
                    onClick={() => setActiveTab('lost')}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'lost' ? 'bg-white text-orange-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
                >
                    我丢了东西
                </button>
                <button 
                    onClick={() => setActiveTab('found')}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'found' ? 'bg-white text-orange-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
                >
                    我捡到了
                </button>
            </div>
        </div>
        <Search className="absolute right-[-20px] bottom-[-20px] w-32 h-32 text-white opacity-10 rotate-12" />
      </div>

      {/* Smart Match Notification Example */}
      {activeTab === 'lost' && (
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex items-start gap-3 shadow-sm">
            <div className="bg-indigo-100 p-2 rounded-full text-indigo-600 mt-1">
                <CheckCircle className="w-5 h-5" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-indigo-900 text-sm">发现智能匹配!</h4>
                <p className="text-indigo-700 text-xs mt-1 leading-relaxed">
                    您发布的 "蓝色保温杯" 与今日 "体育馆" 新发布的拾取信息匹配度高达 92%。
                </p>
                <button className="mt-2 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-md font-medium hover:bg-indigo-700 transition-colors">
                    立即核实
                </button>
            </div>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {filteredItems.map(item => (
            <Link to={`/lost-found/${item.id}`} key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex gap-4 hover:shadow-md transition-shadow cursor-pointer block">
                <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 flex-col gap-1">
                            <Info className="w-6 h-6" />
                            <span className="text-[10px]">无图</span>
                        </div>
                    )}
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-gray-800 line-clamp-1">{item.title}</h3>
                            {item.matchScore && (
                                <span className="flex-shrink-0 text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    匹配度 {item.matchScore}%
                                </span>
                            )}
                        </div>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 leading-snug">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {item.date}</span>
                    </div>
                </div>
            </Link>
        ))}

        {filteredItems.length === 0 && (
            <div className="text-center py-16 text-gray-400 bg-white rounded-xl border border-gray-100 border-dashed">
                <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>未找到相关信息</p>
                <button 
                    onClick={() => navigate(`/lost-found/publish?type=${activeTab}`)}
                    className="mt-4 px-4 py-2 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200"
                >
                    发布一条{activeTab === 'lost' ? '寻物启事' : '招领信息'}
                </button>
            </div>
        )}
      </div>

       {/* Floating Publish Button */}
       <button 
        onClick={() => navigate(`/lost-found/publish?type=${activeTab}`)}
        className="fixed bottom-20 md:bottom-10 right-4 md:right-10 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white p-4 rounded-full shadow-lg shadow-orange-500/40 z-40 transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 pr-6 group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        <span className="font-semibold">{activeTab === 'lost' ? '发布寻物' : '发布招领'}</span>
      </button>
    </div>
  );
};

export default LostFound;