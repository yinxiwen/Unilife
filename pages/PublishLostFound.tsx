
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Upload, X, MapPin, Clock } from 'lucide-react';

const PublishLostFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') === 'found' ? 'found' : 'lost';
  
  const [type, setType] = useState<'lost' | 'found'>(initialType);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to add item would go here
    navigate('/lost-found');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white md:rounded-3xl md:shadow-xl md:border md:border-gray-100 min-h-screen md:min-h-0 md:my-8 overflow-hidden animate-in slide-in-from-bottom duration-300">
      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
         <h2 className="text-xl font-bold text-gray-800">发布失物/寻物信息</h2>
         <button onClick={() => navigate('/lost-found')} className="text-gray-400 hover:text-gray-600 bg-gray-50 p-2 rounded-full transition-colors">
             <X className="w-5 h-5" />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
         {/* Toggle */}
         <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
                type="button"
                onClick={() => setType('lost')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'lost' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                我丢了东西
            </button>
            <button 
                type="button"
                onClick={() => setType('found')}
                className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${type === 'found' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
                我捡到了
            </button>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">物品名称</label>
            <input 
                required 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all" 
                placeholder="如：黑色索尼耳机" 
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    {type === 'lost' ? '丢失地点' : '捡到地点'}
                </label>
                <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        required 
                        value={location} 
                        onChange={e => setLocation(e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm" 
                        placeholder="如：第二教学楼 305" 
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    发生时间
                </label>
                <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input 
                        required 
                        type="datetime-local"
                        value={dateTime} 
                        onChange={e => setDateTime(e.target.value)} 
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all text-sm appearance-none" 
                    />
                </div>
            </div>
        </div>

        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">详细描述</label>
            <textarea 
                required 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none h-32 resize-none transition-all" 
                placeholder="请详细描述物品的特征，如颜色、品牌、破损处等..." 
            />
        </div>

        {/* Upload */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">图片资料 (建议上传)</label>
             <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-indigo-500" />
                </div>
                <span className="text-xs font-medium">添加图片有助于提高 AI 匹配成功率</span>
            </div>
        </div>

        <button 
            type="submit" 
            className={`w-full py-4 font-bold rounded-2xl transition-all shadow-lg text-white text-lg mt-4 ${type === 'lost' ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-green-600 hover:bg-green-700 shadow-green-200'}`}
        >
            立即发布
        </button>
      </form>
    </div>
  );
};

export default PublishLostFound;
