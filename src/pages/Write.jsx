import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const WriteNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Supabase 'notices' 테이블에 데이터 삽입
      const { error } = await supabase
        .from('notices')
        .insert([{ title, content, author }]);

      if (error) throw error;

      alert('게시글이 성공적으로 등록되었습니다!');
      navigate('/NoticeBoard'); // 등록 후 게시판으로 이동
    } catch (error) {
      console.error('Error:', error.message);
      alert('등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">글쓰기</h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900 p-8 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="이름을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 focus:outline-none focus:border-blue-500"
              placeholder="제목을 입력하세요"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-slate-400">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 h-48 focus:outline-none focus:border-blue-500"
              placeholder="내용을 입력하세요"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? '등록 중...' : '게시글 등록하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteNotice;