
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, CreditCard, Box, ShieldCheck, ChevronRight, Bell, Heart, HelpCircle } from 'lucide-react';
import { currentUser } from '../services/mockData';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[100px] -z-0 opacity-50"></div>
        <img src={currentUser.avatar} alt="Profile" className="w-20 h-20 rounded-full border-4 border-white shadow-sm z-10" />
        <div className="flex-1 z-10">
            <h2 className="text-xl font-bold text-gray-800">{currentUser.name}</h2>
            <p className="text-gray-500 text-sm">{currentUser.college}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> 已认证学生
                </span>
                <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    信用分: {currentUser.creditScore}
                </span>
            </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full z-10">
             <Settings className="w-6 h-6 text-gray-400" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div 
          onClick={() => navigate('/profile/transactions')}
          className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="text-2xl font-bold text-gray-800">12</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">订单</div>
        </div>
        <div 
          onClick={() => navigate('/profile/posts')}
          className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="text-2xl font-bold text-gray-800">5</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">发布</div>
        </div>
        <div 
          onClick={() => navigate('/forum')}
          className="bg-white p-4 rounded-xl text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="text-2xl font-bold text-gray-800">89</div>
            <div className="text-xs text-gray-500 uppercase font-medium mt-1">获赞</div>
        </div>
      </div>

      {/* Menu List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {[
            { icon: Box, label: '我的发布', color: 'text-blue-500', bg: 'bg-blue-50', path: '/profile/posts' },
            { icon: CreditCard, label: '交易记录', color: 'text-purple-500', bg: 'bg-purple-50', path: '/profile/transactions' },
            { icon: Heart, label: '我的收藏', color: 'text-red-500', bg: 'bg-red-50', path: '/profile/favorites' },
            { icon: Bell, label: '消息通知', color: 'text-orange-500', bg: 'bg-orange-50', path: '/profile/notifications' },
        ].map((item, idx) => (
            <div 
                key={idx} 
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors"
            >
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {[
            { icon: ShieldCheck, label: '隐私与安全', color: 'text-green-500', bg: 'bg-green-50' },
            { icon: HelpCircle, label: '帮助与反馈', color: 'text-gray-500', bg: 'bg-gray-100' },
        ].map((item, idx) => (
             <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300" />
            </div>
        ))}
      </div>
       
       <p className="text-center text-xs text-gray-400 pt-4">智慧校园 v1.0.2 Build 2024</p>
    </div>
  );
};

export default Profile;
