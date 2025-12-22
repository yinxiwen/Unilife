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
import Admin from './pages/Admin';
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
          <Route 
            path="/admin" 
            element={currentUser.role === 'admin' ? <Admin /> : <Navigate to="/" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;