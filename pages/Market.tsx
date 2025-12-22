import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Heart, Search } from 'lucide-react';
import { products as initialProducts } from '../services/mockData';
import { Product } from '../types';

const Market: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [filter, setFilter] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['全部', '数码', '图书', '交通', '生活'];

  const filteredItems = items.filter(item => {
      const matchesCategory = filter === '全部' || item.category === filter;
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-[80vh] animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">跳蚤市场</h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
            type="text" 
            placeholder="搜索商品..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
        />
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {categories.map(cat => (
            <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                    filter === cat 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
                {cat}
            </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map(item => (
            <Link to={`/market/${item.id}`} key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-full cursor-pointer hover:bg-white shadow-sm" onClick={(e) => e.preventDefault()}>
                        <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 hover:fill-current transition-colors" />
                    </div>
                    {item.status === 'sold' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <span className="text-white font-bold border-2 border-white px-3 py-1 rounded-md transform -rotate-12">已售出</span>
                        </div>
                    )}
                </div>
                <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-1">{item.title}</h3>
                    <div className="mt-auto flex items-end justify-between">
                        <span className="text-lg font-bold text-red-600">¥{item.price}</span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                             <img src={item.seller.avatar} className="w-5 h-5 rounded-full object-cover" alt="Seller" />
                             <span className="truncate max-w-[60px]">{item.seller.name}</span>
                        </div>
                    </div>
                </div>
            </Link>
        ))}
        {filteredItems.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400">
                 <p>未找到相关商品</p>
             </div>
        )}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => navigate('/market/publish')}
        className="fixed bottom-20 md:bottom-10 right-4 md:right-10 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-500/40 z-40 transition-transform hover:scale-110 active:scale-95 flex items-center gap-2 pr-6 group"
      >
        <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
        <span className="font-semibold">发布闲置</span>
      </button>
    </div>
  );
};

export default Market;