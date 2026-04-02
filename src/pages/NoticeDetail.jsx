import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState(null); // 바구니 이름: notice
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true); // 로딩 시작
        const response = await fetch(`/api/posts?id=${id}`);
        
        if (!response.ok) throw new Error('게시물을 찾을 수 없습니다.');
        
        const data = await response.json();
        if (!data) throw new Error('존재하지 않는 게시물입니다.');
        
        // ★ 수정: setPost가 아니라 위에서 만든 setNotice를 사용해야 합니다!
        setNotice(data); 
      } catch (error) {
        console.error(error.message);
        alert(error.message);
      } finally {
        // ★ 추가: 데이터 로딩이 끝나면 로딩 상태를 꺼줘야 화면이 보입니다!
        setLoading(false); 
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
      데이터를 불러오는 중...
    </div>
  );
  
  if (!notice) return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white gap-4">
      <p>게시물을 찾을 수 없습니다.</p>
      <button onClick={() => navigate(-1)} className="bg-blue-600 px-4 py-2 rounded">뒤로가기</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white font-sans">
      <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl">
        <button 
          onClick={() => navigate(-1)} 
          className="text-slate-400 hover:text-white mb-8 flex items-center gap-2 transition-colors"
        >
          ← 뒤로가기
        </button>

        <header className="mb-8 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold mb-4 leading-tight">{notice.title}</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm">
            <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full font-bold">
              {notice.author || '관리자'}
            </span>
            <span className="font-mono">
              {notice.created_at ? new Date(notice.created_at).toLocaleString() : ''}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">{notice.board_name}</span>
          </div>
        </header>

        <div className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
          {notice.content}
        </div>
      </div>
    </div>
  );
};

export default NoticeDetail;