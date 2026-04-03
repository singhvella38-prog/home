import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Write = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. 로그인 여부 체크
    const savedUser = localStorage.getItem('user');
    if (!savedUser) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/Login');
      return;
    }
    setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. 작성자 정보를 현재 로그인한 유저의 이름으로 고정
    const postData = {
      title,
      content,
      author: user.name, // 자동 기록
      board_name: '자유게시판' // 또는 선택된 카테고리
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('글이 등록되었습니다.');
        navigate('/FreeBoard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold border-l-4 border-blue-500 pl-4">새 글 작성</h1>
        
        {/* 작성자 표시 (수정 불가) */}
        <div className="bg-gray-800 p-4 rounded-lg flex items-center gap-3">
          <span className="text-gray-400 text-sm">작성자:</span>
          <span className="font-bold text-blue-400">{user?.name}님</span>
        </div>

        <input 
          type="text" 
          placeholder="제목을 입력하세요"
          className="w-full bg-gray-800 border border-gray-700 p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea 
          placeholder="내용을 입력하세요"
          className="w-full bg-gray-800 border border-gray-700 p-3 rounded h-64"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-4">
          <button type="submit" className="flex-1 bg-blue-600 py-3 rounded font-bold hover:bg-blue-700">
            등록하기
          </button>
          <button type="button" onClick={() => navigate(-1)} className="flex-1 bg-gray-700 py-3 rounded">
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;