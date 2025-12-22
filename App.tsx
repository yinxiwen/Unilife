
import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Login from './pages/Login';
import Chat from './pages/Chat';
import { currentUser } from './services/mockData';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/market" element={<ProtectedRoute><Market /></ProtectedRoute>} />
        <Route path="/market/:id" element={<ProtectedRoute><ProductDetail /></ProtectedRoute>} />
        <Route path="/market/publish" element={<ProtectedRoute><PublishMarket /></ProtectedRoute>} />
        
        <Route path="/lost-found" element={<ProtectedRoute><LostFound /></ProtectedRoute>} />
        <Route path="/lost-found/:id" element={<ProtectedRoute><LostFoundDetail /></ProtectedRoute>} />
        <Route path="/lost-found/publish" element={<ProtectedRoute><PublishLostFound /></ProtectedRoute>} />
        
        <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
        <Route path="/forum/:id" element={<ProtectedRoute><ForumDetail /></ProtectedRoute>} />
        <Route path="/forum/publish" element={<ProtectedRoute><PublishForum /></ProtectedRoute>} />
        
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/user/:id" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
        <Route path="/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        
        <Route 
          path="/admin" 
          element={currentUser.role === 'admin' ? <ProtectedRoute><Admin /></ProtectedRoute> : <Navigate to="/" replace />} 
        />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
