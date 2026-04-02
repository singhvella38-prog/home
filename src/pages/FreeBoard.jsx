import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchFreePosts = async () => {
      try {
        setLoading(true);
        
        // 1. 주소를 /api/posts로 변경
        // 2. 뒤에 ?board=자유게시판 을 붙여서 자유게시판 데이터만 요청
        const response = await fetch('/api/posts?board=' + encodeURIComponent('자유게시판'));
        
        if (!response.ok) throw new Error('데이터 로딩 실패');
        
        const data = await response.json();
        setPosts(data || []);
      } catch (error) {
        console.error('Error fetching free posts:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFreePosts();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      로딩 중...
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더 섹션 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">
              자유 게시판
            </h1>
            <p className="text-gray-400 mt-2 ml-5">
              회원 여러분의 소중한 의견을 자유롭게 나누는 공간입니다. (D1 DB)
            </p>
          </div>
          
          <button 
            onClick={() => navigate('/Write', { state: { category: 'free' } })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition shadow-lg flex items-center gap-2 w-fit"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            글쓰기
          </button>
        </div>

        {/* 리스트 테이블 영역 */}
        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-800/50 border-b border-gray-700 text-gray-400 text-sm uppercase">
                <th className="py-5 px-6 w-20 text-center">번호</th>
                <th className="py-5 px-6">제목</th>
                <th className="py-5 px-6 w-32">작성자</th>
                <th className="py-5 px-6 w-28 text-center">날짜</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <tr 
                    key={post.id} 
                    className="hover:bg-gray-700/30 transition-colors cursor-pointer group"
                    onClick={() => navigate(`/notice/${post.id}`)}
                  >
                    <td className="py-5 px-6 text-center text-gray-500">
                      {posts.length - index}
                    </td>
                    <td className="py-5 px-6 font-medium group-hover:text-blue-400 transition">
                      {post.title}
                    </td>
                    <td className="py-5 px-6 text-gray-400">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                          {post.author ? post.author[0] : 'U'}
                        </div>
                        {post.author || '익명'}
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center text-gray-500 text-sm">
                      {new Date(post.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-10 text-center text-gray-500">
                    등록된 게시물이 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreeBoard;