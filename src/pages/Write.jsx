import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Write = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 카테고리 매핑 (DB에는 한글로 저장하는 것이 관리하기 편합니다)
  const categoryMap = {
    notice: '공지사항',
    free: '자유게시판'
  };
  const boardCategory = location.state?.category || 'free';
  const dbBoardName = categoryMap[boardCategory];

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Cloudflare API 서버로 데이터 전송
      const response = await fetch('/api/write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title, 
          content, 
          author, 
          board_name: dbBoardName 
        }),
      });

      if (!response.ok) throw new Error('글 등록 실패');

      alert('글이 성공적으로 등록되었습니다.');
      
      // 작성 후 해당 게시판으로 이동
      if (boardCategory === 'notice') {
        navigate('/NoticeBoard');
      } else {
        navigate('/FreeBoard');
      }
    } catch (error) {
      alert('글 등록 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
          {boardCategory === 'notice' ? '📢 공지사항 작성' : '📝 자유게시판 글쓰기'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ... 이하 UI 코드는 기존과 동일 (생략) ... */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">작성자</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
              placeholder="이름을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500"
              placeholder="제목을 입력하세요"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">내용</label>
            <textarea
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 focus:outline-none focus:border-blue-500 resize-none"
              placeholder="내용을 입력하세요"
              required
            ></textarea>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {loading ? '등록 중...' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;