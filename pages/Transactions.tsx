
import React from 'react';
import { transactions } from '../services/mockData';
import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const Transactions: React.FC = () => {
  return (
    <div className="space-y-4 animate-in slide-in-from-right duration-300">
      <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-100 mb-6">
        <h3 className="text-indigo-100 text-sm font-medium mb-1">本月交易额</h3>
        <p className="text-4xl font-black">¥ 3,225.00</p>
      </div>

      <div className="space-y-3">
        <h4 className="font-bold text-gray-800 text-lg">最近交易</h4>
        {transactions.map(t => (
          <div key={t.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
            <div className={`p-3 rounded-xl ${t.type === 'buy' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {t.type === 'buy' ? <ArrowDownLeft /> : <ArrowUpRight />}
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-gray-800">{t.title}</h5>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" /> {t.date}
              </p>
            </div>
            <div className="text-right">
              <p className={`font-black ${t.type === 'buy' ? 'text-gray-800' : 'text-green-600'}`}>
                {t.type === 'buy' ? '-' : '+'} ¥{t.price}
              </p>
              <span className="text-[10px] text-gray-400 font-bold">{t.status}</span>
            </div>
          </div>
        ))}
        {transactions.length === 0 && <p className="text-center py-12 text-gray-400">暂无交易记录</p>}
      </div>
    </div>
  );
};

export default Transactions;
