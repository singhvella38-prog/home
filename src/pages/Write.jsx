import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. useLocation 추가

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 2. 위치 정보 가져오기
  
  // 3. 전달받은 카테고리(공지사항 or 자유게시판)를 가져옵니다. 
  // 만약 직접 주소를 치고 들어오면 기본값으로 '자유게시판'을 설정합니다.
  const category = location.state?.category || '자유게시판';

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
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

    const postData = {
      title,
      content,
      author: user.name,
      board_name: category // ★ 여기서 고정값이 아닌 category 변수를 사용합니다!
    };

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert(`${category}에 글이 등록되었습니다.`);
        // 등록 후 해당 게시판으로 돌아가기
        navigate(category === '공지사항' ? '/NoticeBoard' : '/FreeBoard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-white font-sans">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
        <header className="mb-10">
          <h1 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">
            {category} 글쓰기
          </h1>
          <p className="text-gray-400 mt-2 ml-5 text-sm">
            현재 <span className="text-blue-400 font-bold">{user?.name}</span>님 계정으로 작성 중입니다.
          </p>
        </header>

        <div className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700 space-y-4">
          <input 
            type="text" 
            placeholder="제목을 입력하세요"
            className="w-full bg-gray-700 border border-gray-600 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea 
            placeholder="내용을 입력하세요"
            className="w-full bg-gray-700 border border-gray-600 p-4 rounded-xl h-80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="flex gap-4">
          <button 
            type="submit" 
            className="flex-1 bg-blue-600 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            등록하기
          </button>
          <button 
            type="button" 
            onClick={() => navigate(-1)} 
            className="flex-1 bg-gray-800 border border-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-700 transition"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;