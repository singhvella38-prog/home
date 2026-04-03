import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // API 호출: D1 데이터베이스에서 ID로 게시글 한 개 가져오기
        const response = await fetch(`/api/posts?id=${id}`);
        
        if (!response.ok) throw new Error('게시물을 찾을 수 없습니다.');
        
        const data = await response.json();
        if (!data) throw new Error('존재하지 않는 게시물입니다.');
        
        setNotice(data); 
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      } finally {
        setLoading(false); 
      }
    };
    fetchPost();
  }, [id]);

  // ★ 추가: 뒤로가기 시 원래 게시판 타입으로 돌아가기 위한 함수
  const handleGoBack = () => {
    if (notice) {
      // board_name이 '공지사항'이면 /board/notice로, 아니면 /board/free로 보냅니다.
      const boardType = notice.board_name === '공지사항' ? 'notice' : 'free';
      navigate(`/board/${boardType}`);
    } else {
      navigate(-1); // 데이터가 없을 땐 단순 뒤로가기
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium text-slate-400">내용을 불러오는 중...</p>
      </div>
    </div>
  );
  
  if (!notice) return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white gap-4">
      <p className="text-xl text-slate-400">게시물을 찾을 수 없습니다.</p>
      <button onClick={() => navigate(-1)} className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition-all shadow-lg">
        뒤로가기
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white font-sans">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* 장식용 배경 효과 */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

        <button 
          onClick={handleGoBack} // 수정된 뒤로가기 함수 사용
          className="group text-slate-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> 뒤로가기
        </button>

        <header className="mb-8 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600/20 text-blue-400 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              {notice.board_name}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight text-slate-100">
            {notice.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 font-bold border border-slate-700">
                {notice.author ? notice.author[0] : 'M'}
              </div>
              <span className="font-bold text-slate-200">{notice.author || '관리자'}</span>
            </div>
            <span className="text-slate-700">|</span>
            <span className="font-mono">
              {notice.created_at ? new Date(notice.created_at).toLocaleString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              }) : ''}
            </span>
          </div>
        </header>

        <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap min-h-[300px]">
          {notice.content}
        </div>

        {/* 하단 푸터 (수정/삭제 등 확장 가능 영역) */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex justify-end">
           <button 
             onClick={handleGoBack}
             className="text-sm text-slate-500 hover:text-white transition-colors"
           >
             목록으로 돌아가기
           </button>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;