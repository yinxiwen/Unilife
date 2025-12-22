import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';
import { checkContentSafety } from '../services/geminiService';

const PublishMarket: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('生活');
  const [auditStatus, setAuditStatus] = useState<'idle' | 'checking' | 'approved' | 'rejected'>('idle');

  const categories = ['数码', '图书', '交通', '生活', '美妆', '运动'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuditStatus('checking');
    
    // Simulate AI Check
    const safetyResult = await checkContentSafety(`${title} ${desc}`);
    
    if (safetyResult.safe) {
        setAuditStatus('approved');
        setTimeout(() => {
            navigate('/market'); 
        }, 1000);
    } else {
        setAuditStatus('rejected');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white md:rounded-2xl md:shadow-sm md:border md:border-gray-100 min-h-screen md:min-h-0 md:my-8 overflow-hidden animate-in slide-in-from-bottom duration-300">
      {/* Mobile Header Removed to avoid duplication with Layout */}

      <div className="hidden md:flex items-center justify-between p-6 border-b border-gray-100">
         <h2 className="text-xl font-bold">发布闲置宝贝</h2>
         <button onClick={() => navigate('/market')} className="text-gray-400 hover:text-gray-600">
             <X className="w-6 h-6" />
         </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
        {/* Image Upload Placeholder */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="bg-white p-3 rounded-full shadow-sm mb-3">
                <Upload className="w-6 h-6 text-indigo-500" />
            </div>
            <p className="text-sm font-medium">点击上传商品图片</p>
            <p className="text-xs mt-1">支持 JPG, PNG (最多9张)</p>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">商品标题</label>
            <input 
                required 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="品牌型号，如：MacBook Pro M1" 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">价格 (¥)</label>
            <input 
                required 
                type="number" 
                value={price} 
                onChange={e => setPrice(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-mono" 
                placeholder="0.00" 
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
            <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                    <button
                        type="button"
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            category === cat 
                            ? 'bg-indigo-600 text-white border-indigo-600' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">详细描述</label>
            <textarea 
                required 
                value={desc} 
                onChange={e => setDesc(e.target.value)} 
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none h-32 resize-none transition-all" 
                placeholder="描述一下宝贝的新旧程度、入手渠道、转手原因..." 
            />
        </div>

        <div className="pt-4">
            <button 
                type="submit" 
                disabled={auditStatus === 'checking'}
                className={`w-full py-3.5 font-bold rounded-xl transition-all flex justify-center items-center shadow-lg ${
                    auditStatus === 'checking' ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } text-white`}
            >
                {auditStatus === 'checking' ? (
                    <span className="flex items-center gap-2"><span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span> 智能审核中...</span>
                ) : auditStatus === 'rejected' ? '内容包含敏感词' : '确认发布'}
            </button>
            {auditStatus === 'approved' && <p className="text-green-600 text-center text-sm font-medium mt-3 animate-pulse">发布成功！正在跳转...</p>}
        </div>
      </form>
    </div>
  );
};

export default PublishMarket;