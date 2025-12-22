import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, X, MapPin } from 'lucide-react';

const PublishLostFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'found' ? 'found' : 'lost';
  
  const [type, setType] = useState<'lost' | 'found'>(initialType);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add item would go here
    navigate('/lost-found');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 min-h-screen md:min-h-0 md:my-8 overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Mobile Header Removed to avoid duplication with Layout */}

      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
         <h2 className="text-xl font-bold">发布失物/寻物信息</h2>
         <button onClick={() => navigate('/lost-found')} className="text-gray-400 hover:text-gray-600">
             <X className="w-6 h-6" />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
         {/* Toggle */}
         <div className="flex bg-gray-100 p-1 rounded-xl">
            <button 
                type="button"
                onClick={() => setType('lost')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'lost' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500'}`}
            >
                我丢了东西
            </button>
            <button 
                type="button"
                onClick={() => setType('found')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${type === 'found' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500'}`}
            >
                我捡到了
            </button>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">物品名称</label>
            <input 
                required 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                placeholder="如：黑色索尼耳机" 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {type === 'lost' ? '丢失地点' : '捡到地点'}
            </label>
            <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                    required 
                    value={location} 
                    onChange={e => setLocation(e.target.value)} 
                    className="w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                    placeholder="如：第二教学楼 305" 
                />
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea 
                required 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none h-32 resize-none transition-all" 
                placeholder="请详细描述物品的特征、具体时间..." 
            />
        </div>

        {/* Upload */}
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">上传图片 (可选)</label>
             <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer h-32">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs">添加图片有助于提高匹配率</span>
            </div>
        </div>

        <button 
            type="submit" 
            className={`w-full py-3.5 font-bold rounded-xl transition-all shadow-lg text-white mt-4 ${type === 'lost' ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
            立即发布
        </button>
      </form>
    </div>
  );
};

export default PublishLostFound;