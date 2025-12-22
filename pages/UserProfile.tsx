
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, MessageCircle, MapPin, Award, Star, Package } from 'lucide-react';
import { allUsers, products } from '../services/mockData';

const UserProfile: React.FC = () => {
  const { id } = useParams();
  const user = allUsers.find(u => u.id === id);
  const userProducts = products.filter(p => p.seller.id === id);

  if (!user) {
    return <div className="p-8 text-center">用户不存在</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20 md:pb-8">
      {/* Header Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-6 pb-8 -mt-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-end gap-4">
              <img src={user.avatar} className="w-24 h-24 rounded-3xl border-4 border-white shadow-md object-cover" alt={user.name} />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  {user.verified && <ShieldCheck className="w-5 h-5 text-indigo-500 fill-indigo-50" />}
                </div>
                <p className="text-gray-500 text-sm font-medium">{user.college}</p>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <button className="flex-1 md:flex-none px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                <MessageCircle className="w-4 h-4" /> 发送私信
              </button>
              <button className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm hover:bg-gray-200 transition-colors">
                关注
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">{user.creditScore}</div>
              <div className="text-xs text-gray-400 font-bold uppercase">信用评分</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">99%</div>
              <div className="text-xs text-gray-400 font-bold uppercase">好评率</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900">24</div>
              <div className="text-xs text-gray-400 font-bold uppercase">已售商品</div>
            </div>
             <div className="text-center">
              <div className="text-xl font-bold text-gray-900">328</div>
              <div className="text-xs text-gray-400 font-bold uppercase">获赞</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-orange-500" /> 校园成就
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-medium text-gray-600">荣誉校友</span>
              </div>
               <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-gray-600">诚信卖家</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-indigo-500" /> 活跃区域
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">北校区</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">图书馆</span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">中心操场</span>
            </div>
          </div>
        </div>

        {/* User Listings */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-gray-900">正在出售 ({userProducts.length})</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userProducts.map(product => (
              <Link to={`/market/${product.id}`} key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.title} />
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-gray-800 text-sm truncate">{product.title}</h4>
                  <p className="text-indigo-600 font-bold mt-1">¥{product.price}</p>
                </div>
              </Link>
            ))}
            {userProducts.length === 0 && (
              <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-2xl border border-dashed">
                该用户暂时没有发布的商品
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
