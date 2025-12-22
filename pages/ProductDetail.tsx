import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../services/mockData';
import { MessageCircle, ShoppingCart, ShieldCheck, MapPin } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center">商品不存在</div>;
  }

  return (
    <div className="bg-white min-h-[80vh] md:pb-0 animate-in slide-in-from-right duration-300 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:p-12">
      {/* 
        NOTE: The mobile header with back button was removed. 
        It is now handled by Layout.tsx which detects not being on a main path.
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Image Section */}
        <div className="relative h-96 md:h-[500px] bg-gray-100 md:rounded-2xl overflow-hidden group">
          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
          {product.status === 'sold' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-3xl font-bold border-4 border-white px-6 py-2 rounded-lg transform -rotate-12">已售出</span>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="p-4 md:p-0 flex flex-col h-full">
          <div className="flex-1 pb-24 md:pb-0">
            <div className="flex items-center gap-2 mb-2">
               <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full font-bold">{product.category}</span>
               <span className="text-gray-400 text-xs">{product.createdAt}发布</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
            <div className="text-3xl font-bold text-red-600 mb-6">¥{product.price}</div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mb-8">
                <h3 className="text-sm font-bold text-gray-500 mb-2">商品描述</h3>
                <p className="text-gray-700 leading-relaxed text-base">{product.description}</p>
                 <div className="mt-4 flex items-center text-xs text-gray-400">
                    <MapPin className="w-3 h-3 mr-1" /> 发布于 图书馆大厅
                </div>
            </div>

            {/* Seller Card */}
            <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl shadow-sm mb-6">
                <img src={product.seller.avatar} alt={product.seller.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">{product.seller.name}</h4>
                        {product.seller.verified && <ShieldCheck className="w-4 h-4 text-green-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{product.seller.college} | 信用分 {product.seller.creditScore}</p>
                </div>
                <button className="text-indigo-600 text-sm font-semibold border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-50">
                    查看主页
                </button>
            </div>
          </div>

          {/* Action Buttons - Fixed bottom on mobile, relative on desktop */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50 md:static md:border-0 md:p-0 md:bg-transparent shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3 rounded-xl font-bold hover:bg-indigo-100 transition-colors">
                <MessageCircle className="w-5 h-5" /> 我想要
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-transform active:scale-[0.98]">
                <ShoppingCart className="w-5 h-5" /> 立即购买
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;