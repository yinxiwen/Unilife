
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, Search, MessageSquare, User, Bell, ChevronLeft, LogOut, ShieldCheck } from 'lucide-react';
import { currentUser } from '../services/mockData';

interface LayoutProps {
  children: React.ReactNode;
}

// Fixed: Explicitly typed Layout with LayoutProps to include children support
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;
  const isHome = location.pathname === '/';
  const isDetailPage = /^\/(market|lost-found|forum|user)\/.+/.test(location.pathname);
  const mainPaths = ['/', '/market', '/lost-found', '/forum', '/profile'];
  const showBackButton = !mainPaths.includes(location.pathname);

  const navItems = [
    { icon: Home, label: '首页', path: '/' },
    { icon: ShoppingBag, label: '二手市场', path: '/market' },
    { icon: Search, label: '失物招领', path: '/lost-found' },
    { icon: MessageSquare, label: '校园论坛', path: '/forum' },
    { icon: User, label: '个人中心', path: '/profile' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-slate-800">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-20">
        <div className="p-6 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-indigo-600 p-2 rounded-xl">
              <span className="text-white font-bold text-xl leading-none">U</span>
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              UniLife
            </h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold ${
                isActive(item.path) 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive(item.path) ? 'fill-current' : ''}`} />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
             {currentUser.role === 'admin' && (
               <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-2xl mb-2">
                 <ShieldCheck className="w-5 h-5 text-indigo-500" />
                 管理员后台
               </Link>
            )}
             <div 
               onClick={handleLogout}
               className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-2xl cursor-pointer transition-colors"
             >
                <LogOut className="w-5 h-5" />
                <span>退出登录</span>
             </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:pl-64 min-h-screen">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 shadow-sm">
          <div className="max-w-5xl mx-auto flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                {showBackButton && (
                    <button 
                        onClick={() => navigate(-1)} 
                        className="mr-2 p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                )}
                
                <div className="md:hidden flex items-center gap-2" onClick={() => navigate('/')}>
                    <div className="bg-indigo-600 p-1.5 rounded-lg">
                        <span className="text-white font-bold text-lg leading-none">U</span>
                    </div>
                    <span className="font-bold text-lg text-gray-800">UniLife</span>
                </div>

                {!isHome && (
                    <h2 className="hidden md:block text-lg font-bold text-gray-800 ml-2">
                        {navItems.find(i => isActive(i.path))?.label || '详情'}
                    </h2>
                )}
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-6 h-6 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <Link to="/profile" className="md:hidden">
                  <img src={currentUser.avatar} className="w-8 h-8 rounded-full bg-gray-200 object-cover" alt="Avatar" />
              </Link>
            </div>
          </div>
        </header>

        <main className={`flex-1 max-w-5xl w-full mx-auto p-4 md:p-8 ${isDetailPage ? 'pb-24' : 'pb-24'} md:pb-8`}>
          {children}
        </main>
      </div>

      {!isDetailPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 pb-safe shadow-[0_-1px_15px_rgba(0,0,0,0.05)]">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 active:scale-95 transition-transform ${
                  isActive(item.path) ? 'text-indigo-600' : 'text-gray-400'
                }`}
              >
                <item.icon className={`w-6 h-6 ${isActive(item.path) ? 'fill-current' : 'stroke-current'}`} strokeWidth={isActive(item.path) ? 0 : 2} />
                <span className="text-[10px] font-bold">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
