import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FreeBoard = () => {
  const navigate = useNavigate();

  // 테스트용 데이터 (실제로는 API에서 받아옵니다)
  const [posts] = useState([
    { id: 5, title: "오늘 점심 메뉴 추천받아요!", author: "김철수", date: "2024-03-30", hits: 12 },
    { id: 4, title: "테일윈드 CSS 생각보다 편하네요.", author: "이영희", date: "2024-03-29", hits: 45 },
    { id: 3, title: "리액트 라우터 질문 있습니다.", author: "박민수", date: "2024-03-28", hits: 28 },
    { id: 2, title: "포트폴리오 사이트 만드는 중입니다.", author: "최지우", date: "2024-03-27", hits: 56 },
    { id: 1, title: "첫 글 남겨봅니다. 반가워요!", author: "홍길동", date: "2024-03-26", hits: 89 },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      {/* 본문 영역 - 여기서 중앙 정렬과 최대 너비를 잡아줍니다 */}
      <div className="max-w-6xl mx-auto">
        
        {/* 헤더 섹션 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold border-l-4 border-blue-500 pl-4">
              자유 게시판
            </h1>
            <p className="text-gray-400 mt-2 ml-5">
              회원 여러분의 소중한 의견을 자유롭게 나누는 공간입니다.
            </p>
          </div>
          
          {/* 누구나 글쓰기 가능 */}
          <button 
            onClick={() => navigate('/Write')}
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
                <th className="py-5 px-6 w-20 text-center">조회</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700/50">
              {posts.map((post) => (
                <tr 
                  key={post.id} 
                  className="hover:bg-gray-700/30 transition-colors cursor-pointer group"
                  onClick={() => navigate(`/notice/${post.id}`)} // 편의상 상세페이지는 notice와 공유
                >
                  <td className="py-5 px-6 text-center text-gray-500">{post.id}</td>
                  <td className="py-5 px-6 font-medium group-hover:text-blue-400 transition">
                    {post.title}
                  </td>
                  <td className="py-5 px-6 text-gray-400">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-[10px]">
                        {post.author[0]}
                      </div>
                      {post.author}
                    </div>
                  </td>
                  <td className="py-5 px-6 text-center text-gray-500 text-sm">{post.date}</td>
                  <td className="py-5 px-6 text-center text-gray-500 text-sm">{post.hits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 (디자인용) */}
        <div className="flex justify-center mt-10 gap-2">
          {[1, 2, 3].map(num => (
            <button 
              key={num} 
              className={`w-10 h-10 rounded-lg flex items-center justify-center transition ${num === 1 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FreeBoard;