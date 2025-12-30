
import React from 'react';
import { notifications } from '../services/mockData';
import { Bell, ShoppingBag, Search, Info } from 'lucide-react';

const Notifications: React.FC = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction': return <ShoppingBag className="w-5 h-5" />;
      case 'match': return <Search className="w-5 h-5" />;
      case 'system': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case 'transaction': return 'bg-purple-100 text-purple-600';
      case 'match': return 'bg-orange-100 text-orange-600';
      case 'system': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">全部消息</h3>
        <button className="text-xs text-indigo-600 font-bold">全部已读</button>
      </div>

      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 shadow-sm relative ${!n.read ? 'border-l-4 border-l-indigo-500' : ''}`}>
            <div className={`p-3 rounded-xl flex-shrink-0 self-start ${getColorClass(n.type)}`}>
              {getIcon(n.type)}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {n.type === 'match' ? '智能匹配' : n.type === 'transaction' ? '交易动态' : '系统通知'}
                </span>
                <span className="text-[10px] text-gray-300">{n.date}</span>
              </div>
              <p className={`text-sm leading-relaxed ${!n.read ? 'text-gray-900 font-bold' : 'text-gray-600'}`}>
                {n.message}
              </p>
            </div>
            {!n.read && (
              <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full"></div>
            )}
          </div>
        ))}
        {notifications.length === 0 && <p className="text-center py-12 text-gray-400">暂无通知</p>}
      </div>
    </div>
  );
};

export default Notifications;
