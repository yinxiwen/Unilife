
import React from 'react';
import { Link } from 'react-router-dom';
import { products, posts } from '../services/mockData';
import { Heart, ShoppingBag, MessageSquare, ThumbsUp } from 'lucide-react';

const Favorites: React.FC = () => {
  // Mock favorites - in a real app these would come from a user's favorited IDs list
  const favProducts = products.slice(0, 3);
  const favPosts = posts.slice(0, 2);

  return (
    <div className="space-y-10 animate-in slide-in-from-right duration-300 pb-12">
      {/* Favorited Products Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-red-50 p-2 rounded-lg text-red-500">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">收藏的宝贝 ({favProducts.length})</h3>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {favProducts.map(item => (
            <Link 
              to={`/market/${item.id}`} 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition-all"
            >
              <div className="relative aspect-square">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-1 right-1 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
                  <Heart className="w-3 h-3 text-red-500 fill-current" />
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-bold text-gray-800 text-[10px] truncate leading-tight">{item.title}</h4>
                <p className="text-red-500 font-black text-xs mt-0.5">¥{item.price}</p>
              </div>
            </Link>
          ))}
          {favProducts.length === 0 && (
            <div className="col-span-full py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              暂无收藏的商品
            </div>
          )}
        </div>
      </section>

      {/* Favorited Posts Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">收藏的帖子 ({favPosts.length})</h3>
        </div>

        <div className="space-y-3">
          {favPosts.map(post => (
            <Link 
              to={`/forum/${post.id}`} 
              key={post.id} 
              className="block bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-2">
                <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full border border-gray-100" />
                <span className="text-xs font-bold text-gray-700">{post.author.name}</span>
                <span className="text-[10px] text-gray-400 ml-auto">{post.createdAt}</span>
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-1">{post.title}</h4>
              <p className="text-xs text-gray-500 line-clamp-1 mb-3">{post.content}</p>
              <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="w-3 h-3" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> {post.comments}
                </span>
                <span className="ml-auto text-indigo-500 flex items-center gap-1">
                  <Heart className="w-3 h-3 fill-current" /> 已收藏
                </span>
              </div>
            </Link>
          ))}
          {favPosts.length === 0 && (
            <div className="py-8 text-center bg-white rounded-2xl border border-dashed border-gray-200 text-gray-400 text-sm">
              暂无收藏的帖子
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Favorites;
