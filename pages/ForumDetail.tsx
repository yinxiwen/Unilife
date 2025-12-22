import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { posts, currentUser } from '../services/mockData';
import { MessageSquare, ThumbsUp, Share2, Send } from 'lucide-react';

const ForumDetail: React.FC = () => {
  const { id } = useParams();
  const post = posts.find(p => p.id === id);
  const [commentText, setCommentText] = useState('');
  
  // Mock Comments
  const [comments, setComments] = useState([
    { id: 1, user: '张同学', content: '确实，我也觉得那个食堂不错！', time: '5分钟前' },
    { id: 2, user: '李学长', content: '下次一起去吃啊。', time: '10分钟前' }
  ]);

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setComments([...comments, { id: Date.now(), user: currentUser.name, content: commentText, time: '刚刚' }]);
    setCommentText('');
  };

  if (!post) {
    return <div className="p-8 text-center">帖子不存在</div>;
  }

  return (
    <div className="bg-white min-h-[80vh] md:pb-0 animate-in slide-in-from-right duration-300 md:rounded-3xl md:shadow-sm md:border md:border-gray-100 md:p-12">
      {/* 
         NOTE: Mobile header is handled by Layout.tsx. 
         Added desktop styling (rounded, shadow, padding) to outer container.
      */}

      <div className="p-4 md:p-0">
        {/* Post Header */}
        <div className="flex items-center gap-3 mb-4">
            <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full border border-gray-100" />
            <div>
                <h4 className="font-bold text-gray-900">{post.author.name}</h4>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{post.createdAt}</span>
                    <span>•</span>
                    <span>{post.category}</span>
                </div>
            </div>
        </div>

        {/* Post Content */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
            {post.content}
        </div>

        {/* Post Stats */}
        <div className="flex items-center justify-between py-3 border-y border-gray-50 mb-6">
            <div className="flex gap-6">
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <ThumbsUp className="w-5 h-5" />
                    <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-medium">
                    <MessageSquare className="w-5 h-5" />
                    <span>{post.comments}</span>
                </div>
            </div>
             <button className="text-gray-400 flex items-center gap-1 text-sm">
                <Share2 className="w-4 h-4" /> 分享
            </button>
        </div>

        {/* Comments Section */}
        <h3 className="font-bold text-gray-800 mb-4">全部评论 ({comments.length})</h3>
        <div className="space-y-6 pb-24">
            {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                        {comment.user[0]}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">{comment.user}</span>
                            <span className="text-xs text-gray-400">{comment.time}</span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{comment.content}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* Input Area - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-100 z-50 md:sticky md:bottom-0">
         <form onSubmit={handleSendComment} className="flex items-center gap-3 max-w-5xl mx-auto">
             <input 
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="说点什么..."
             />
             <button type="submit" className={`p-2.5 rounded-full transition-colors ${commentText.trim() ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                 <Send className="w-5 h-5" />
             </button>
         </form>
      </div>
    </div>
  );
};

export default ForumDetail;