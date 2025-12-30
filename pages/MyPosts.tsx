
import React from 'react';
import { Link } from 'react-router-dom';
import { products, lostItems, posts, currentUser } from '../services/mockData';
import { ShoppingBag, Search, MessageSquare } from 'lucide-react';

const MyPosts: React.FC = () => {
  const myProducts = products.filter(p => p.seller.id === currentUser.id);
  const myLostItems = lostItems.filter(i => i.user.id === currentUser.id);
  const myPosts = posts.filter(po => po.author.id === currentUser.id);

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-300 pb-12">
      {/* Products Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">二手闲置 ({myProducts.length})</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myProducts.map(p => (
            <Link to={`/market/${p.id}`} key={p.id} className="bg-white p-3 rounded-2xl border border-gray-100 flex gap-4 shadow-sm hover:shadow-md transition-all">
              <img src={p.image} className="w-20 h-20 rounded-xl object-cover" alt="" />
              <div className="flex-1 min-w-0 py-1 flex flex-col justify-between">
                <h4 className="font-bold text-gray-800 text-sm truncate">{p.title}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-red-500 font-bold">¥{p.price}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${p.status === 'sold' ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-700'}`}>
                    {p.status === 'active' ? '销售中' : '已售出'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {myProducts.length === 0 && (
            <div className="col-span-full py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              暂无发布的商品
            </div>
          )}
        </div>
      </section>

      {/* Lost and Found Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">失物招领 ({myLostItems.length})</h3>
        </div>

        <div className="space-y-3">
          {myLostItems.map(i => (
            <Link to={`/lost-found/${i.id}`} key={i.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex justify-between items-center shadow-sm hover:shadow-md transition-all">
              <div className="flex gap-4 items-center">
                {i.image ? (
                  <img src={i.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                ) : (
                  <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
                    <Search className="w-5 h-5 text-gray-300" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">{i.title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">{i.location} • {i.date}</p>
                </div>
              </div>
              <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${i.type === 'lost' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                {i.type === 'lost' ? '寻物' : '招领'}
              </span>
            </Link>
          ))}
          {myLostItems.length === 0 && (
            <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              暂无发布的拾领信息
            </div>
          )}
        </div>
      </section>

      {/* Forum Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">论坛帖子 ({myPosts.length})</h3>
        </div>

        <div className="space-y-4">
          {myPosts.map(po => (
            <Link to={`/forum/${po.id}`} key={po.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all block">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-800 text-base">{po.title}</h4>
                <span className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full font-medium">
                  {po.category === 'study' ? '学习' : po.category === 'life' ? '生活' : po.category === 'confession' ? '表白墙' : '社团'}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{po.content}</p>
              <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-gray-400">
                <span className="bg-gray-50 px-2 py-1 rounded-md">{po.createdAt}</span>
                <span className="flex items-center gap-1">👍 {po.likes}</span>
                <span className="flex items-center gap-1">💬 {po.comments}</span>
              </div>
            </Link>
          ))}
          {myPosts.length === 0 && (
            <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              暂无发布的贴文
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default MyPosts;
