import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Share2, MoreHorizontal, Plus, Search } from 'lucide-react';
import { posts as initialPosts } from '../services/mockData';
import { Post } from '../types';

const Forum: React.FC = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  // Map UI categories to data keys
  const categoryMap: Record<string, string> = {
    '全部': 'all',
    '热门': 'trending',
    '学习': 'study',
    '生活': 'life',
    '表白墙': 'confession',
    '社团': 'club'
  };

  const filteredPosts = posts.filter(post => {
      const key = categoryMap[activeCategory];
      const matchesCategory = key === 'all' || (key === 'trending' ? post.likes > 50 : post.category === key);
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
         <h2 className="text-2xl font-bold text-gray-800">校园论坛</h2>
         <button 
            onClick={() => navigate('/forum/publish')}
            className="flex items-center gap-1 text-sm font-medium text-white bg-indigo-600 px-3 py-2 rounded-lg hover:bg-indigo-700 shadow-sm transition-all active:scale-95"
         >
            <Plus className="w-4 h-4" /> 发帖
         </button>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {Object.keys(categoryMap).map((tag) => (
            <button
                key={tag} 
                onClick={() => setActiveCategory(tag)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all whitespace-nowrap ${
                    activeCategory === tag 
                    ? 'bg-gray-900 text-white border-gray-900 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
                {tag}
            </button>
        ))}
      </div>

       {/* Search Bar */}
       <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input 
            type="text" 
            placeholder="搜索帖子..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-400 shadow-sm transition-all text-sm"
        />
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => (
            <Link to={`/forum/${post.id}`} key={post.id} className="block bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3 mb-3">
                    <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full border border-gray-100 object-cover" />
                    <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">{post.author.name}</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">{post.createdAt}</span>
                            <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">{
                                Object.keys(categoryMap).find(key => categoryMap[key] === post.category) || post.category
                            }</span>
                        </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100" onClick={(e) => e.preventDefault()}>
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
                
                <h3 className="font-bold text-lg text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{post.content}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm group">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 text-sm group">
                            <MessageSquare className="w-4 h-4" />
                            <span>{post.comments}</span>
                        </div>
                    </div>
                     <div className="text-gray-400 flex items-center gap-1 text-xs">
                        <Share2 className="w-4 h-4" /> 分享
                    </div>
                </div>
            </Link>
        ))}
        
        {filteredPosts.length === 0 && (
             <div className="py-12 text-center text-gray-400 bg-white rounded-2xl border border-gray-100 border-dashed">
                 <p>没有找到相关帖子</p>
             </div>
        )}
      </div>
    </div>
  );
};

export default Forum;