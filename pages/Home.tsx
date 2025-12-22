import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, MessageSquare, Megaphone, ChevronRight } from 'lucide-react';
import { products, lostItems } from '../services/mockData';

const Home: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero / Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/market" className="group bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">二手市场</h2>
              <p className="text-indigo-100 text-sm mt-1">校内安全买卖</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <ShoppingBag className="w-8 h-8" />
            </div>
          </div>
          <div className="mt-8 flex items-center text-sm font-medium opacity-90">
            去逛逛 <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link to="/lost-found" className="group bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">失物招领</h2>
              <p className="text-orange-100 text-sm mt-1">AI 智能匹配物品</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <Search className="w-8 h-8" />
            </div>
          </div>
           <div className="mt-8 flex items-center text-sm font-medium opacity-90">
            寻找物品 <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>

        <Link to="/forum" className="group bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">校园论坛</h2>
              <p className="text-emerald-100 text-sm mt-1">发现趣事，认识同学</p>
            </div>
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
              <MessageSquare className="w-8 h-8" />
            </div>
          </div>
           <div className="mt-8 flex items-center text-sm font-medium opacity-90">
            参与讨论 <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </Link>
      </div>

      {/* Announcement */}
      <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 flex items-start gap-3">
        <Megaphone className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
            <h3 className="text-sm font-semibold text-yellow-800">系统维护通知</h3>
            <p className="text-xs text-yellow-700 mt-1">图书馆预约系统将在今晚凌晨 2 点至 4 点进行升级维护，届时无法访问。</p>
        </div>
      </div>

      {/* Recommendations / Feeds */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800">新鲜推荐</h3>
            <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">查看全部</span>
        </div>

        {/* CHANGED: Grid layout instead of horizontal scroll for better visibility */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0,3).map(product => (
                <Link to={`/market/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                    <img src={product.image} alt={product.title} className="w-full h-28 object-cover" />
                    <div className="p-3">
                        <h4 className="font-semibold text-gray-800 truncate text-sm">{product.title}</h4>
                        <p className="text-indigo-600 font-bold mt-1 text-sm">¥{product.price}</p>
                    </div>
                </Link>
            ))}
             {lostItems.slice(0,1).map(item => (
                <Link to={`/lost-found/${item.id}`} key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative hover:shadow-md transition-all">
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wide">
                        {item.type === 'lost' ? '寻物' : '招领'}
                    </div>
                    {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-28 object-cover grayscale" />
                    ) : (
                        <div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">暂无图片</div>
                    )}
                    <div className="p-3">
                        <h4 className="font-semibold text-gray-800 truncate text-sm">{item.title}</h4>
                        <p className="text-gray-500 text-xs mt-1 truncate">{item.location}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;