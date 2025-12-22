import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Image as ImageIcon } from 'lucide-react';

const PublishForum: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('life');

  const categories = [
      { key: 'study', label: '学习' },
      { key: 'life', label: '生活' },
      { key: 'confession', label: '表白墙' },
      { key: 'club', label: '社团' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add post would go here
    navigate('/forum');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 min-h-screen md:min-h-0 md:my-8 overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Mobile Header Removed to avoid duplication with Layout */}

      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
         <h2 className="text-xl font-bold">发布新帖子</h2>
         <button onClick={() => navigate('/forum')} className="text-gray-400 hover:text-gray-600">
             <X className="w-6 h-6" />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">选择版块</label>
            <div className="flex gap-2">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        type="button"
                        onClick={() => setCategory(cat.key)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            category === cat.key 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <input 
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-bold placeholder-gray-400 border-none focus:ring-0 px-0" 
                placeholder="请输入标题..." 
            />
            <div className="h-px bg-gray-100 w-full my-2"></div>
        </div>
        
        <div>
                <textarea 
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-64 resize-none text-base text-gray-700 placeholder-gray-400 border-none focus:ring-0 px-0 leading-relaxed"
                placeholder="分享你的新鲜事..."
                />
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                <ImageIcon className="w-6 h-6" />
            </button>
            <div className="flex-1"></div>
            {/* Make Submit Visible on Mobile */}
            <button type="submit" className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
                发布
            </button>
        </div>
      </form>
    </div>
  );
};

export default PublishForum;