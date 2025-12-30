
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Market from './pages/Market';
import ProductDetail from './pages/ProductDetail';
import PublishMarket from './pages/PublishMarket';
import LostFound from './pages/LostFound';
import LostFoundDetail from './pages/LostFoundDetail';
import PublishLostFound from './pages/PublishLostFound';
import Forum from './pages/Forum';
import ForumDetail from './pages/ForumDetail';
import PublishForum from './pages/PublishForum';
import Profile from './pages/Profile';
import UserProfile from './pages/UserProfile';
import Admin from './pages/Admin';
import Chat from './pages/Chat';
import MyPosts from './pages/MyPosts';
import Transactions from './pages/Transactions';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import Stats from './pages/admin/Stats';
import Moderation from './pages/admin/Moderation';
import Config from './pages/admin/Config';
import Logs from './pages/admin/Logs';
import { currentUser } from './services/mockData';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/market" element={<Market />} />
          <Route path="/market/:id" element={<ProductDetail />} />
          <Route path="/market/publish" element={<PublishMarket />} />
          
          <Route path="/lost-found" element={<LostFound />} />
          <Route path="/lost-found/:id" element={<LostFoundDetail />} />
          <Route path="/lost-found/publish" element={<PublishLostFound />} />
          
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumDetail />} />
          <Route path="/forum/publish" element={<PublishForum />} />
          
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/posts" element={<MyPosts />} />
          <Route path="/profile/transactions" element={<Transactions />} />
          <Route path="/profile/favorites" element={<Favorites />} />
          <Route path="/profile/notifications" element={<Notifications />} />
          
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/chat/:id" element={<Chat />} />
          
          {/* 后台管理嵌套路由 */}
          <Route 
            path="/admin" 
            element={currentUser.role === 'admin' ? <Admin /> : <Navigate to="/" replace />}
          >
            {/* 默认重定向到数据统计 */}
            <Route index element={<Navigate to="stats" replace />} />
            <Route path="stats" element={<Stats />} />
            <Route path="moderation" element={<Moderation />} />
            <Route path="config" element={<Config />} />
            <Route path="logs" element={<Logs />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
