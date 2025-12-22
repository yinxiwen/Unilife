
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      setLoading(false);
      navigate('/');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in duration-500">
        <div className="p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg shadow-indigo-200">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">UniLife</h1>
            <p className="text-gray-500 mt-2">智慧校园生活，从这里开始</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                placeholder="学校邮箱" 
                defaultValue="student@university.edu"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                placeholder="密码" 
                defaultValue="password123"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
            >
              {loading ? (
                <span className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  一键登录 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500" defaultChecked />
              记住我
            </label>
            <span className="hover:text-indigo-600 cursor-pointer">忘记密码？</span>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            还没有账号？ <span className="text-indigo-600 font-bold cursor-pointer">立即注册</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
