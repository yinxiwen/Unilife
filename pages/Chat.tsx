
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Send, Image as ImageIcon, Phone, MoreVertical, ChevronLeft, ShoppingBag } from 'lucide-react';
import { allUsers, products, currentUser } from '../services/mockData';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isProductCard?: boolean;
  productData?: {
    title: string;
    price: number;
    image: string;
  };
}

const Chat: React.FC = () => {
  const { id: userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const targetUser = allUsers.find(u => u.id === userId);
  const initialProduct = location.state?.product;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  // Initialize chat with product context if coming from "I want this"
  useEffect(() => {
    if (initialProduct) {
      const productMsg: Message = {
        id: 'p1',
        senderId: currentUser.id,
        text: `你好，我对你发布的 "${initialProduct.title}" 很感兴趣，请问还在吗？`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isProductCard: true,
        productData: {
          title: initialProduct.title,
          price: initialProduct.price,
          image: initialProduct.image
        }
      };
      setMessages([productMsg]);
      
      // Simulating a quick reply from seller
      setTimeout(() => {
        const reply: Message = {
          id: 'r1',
          senderId: userId!,
          text: '在的，同学。你是哪个校区的？可以约在食堂或者图书馆面交。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, reply]);
      }, 1500);
    }
  }, [initialProduct, userId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  if (!targetUser) return <div className="p-8 text-center">用户不存在</div>;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-12rem)] bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 shadow-sm animate-in fade-in duration-300">
      {/* Chat Header */}
      <div className="bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 z-10">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="md:hidden p-1">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="relative">
            <img src={targetUser.avatar} className="w-10 h-10 rounded-full object-cover" alt={targetUser.name} />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-sm leading-tight">{targetUser.name}</h3>
            <p className="text-[10px] text-gray-400 font-medium">在线 | {targetUser.college}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-400">
          <Phone className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
          <MoreVertical className="w-5 h-5 cursor-pointer hover:text-indigo-600 transition-colors" />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => {
          const isMine = msg.senderId === currentUser.id;
          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[80%] flex flex-col ${isMine ? 'items-end' : 'items-start'}`}>
                {msg.isProductCard && msg.productData && (
                  <div className="bg-white border border-gray-100 rounded-2xl p-3 mb-2 shadow-sm flex gap-3 overflow-hidden active:scale-95 transition-transform cursor-pointer">
                    <img src={msg.productData.image} className="w-16 h-16 rounded-lg object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{msg.productData.title}</p>
                      <p className="text-sm font-black text-red-500 mt-1">¥{msg.productData.price}</p>
                      <div className="flex items-center text-[10px] text-gray-400 mt-1">
                        <ShoppingBag className="w-3 h-3 mr-1" /> 点击查看宝贝
                      </div>
                    </div>
                  </div>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  isMine 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.timestamp}</span>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white p-4 border-t border-gray-100">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <button type="button" className="p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors">
            <ImageIcon className="w-6 h-6" />
          </button>
          <input 
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入消息..."
            className="flex-1 bg-gray-100 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
          />
          <button 
            type="submit"
            disabled={!inputText.trim()}
            className={`p-3 rounded-2xl transition-all shadow-md active:scale-95 ${
              inputText.trim() 
              ? 'bg-indigo-600 text-white shadow-indigo-200' 
              : 'bg-gray-100 text-gray-300'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
