import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        // Cloudflare Pages Functions API 호출
        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        // D1에서 가져온 데이터를 상태에 저장
        setNotices(data || []);
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white font-sans">
      데이터를 불러오는 중...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notice Board</h1>
            <p className="text-slate-400 mt-2">공지사항 (D1 Database)</p>
          </div>
          <Link 
            to="/write" 
            state={{ category: 'notice' }} 
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            글쓰기
          </Link>
        </header>

        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <Link to={`/notice/${notice.id}`} key={notice.id} className="block group">
                <article 
                  className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl group-hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">
                      {notice.title}
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">
                      {/* SQLite 날짜 형식을 보기 좋게 변환 */}
                      {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-sm mb-4 line-clamp-3">
                    {notice.content}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
                    <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-blue-400 font-bold">
                        {notice.author ? notice.author[0] : 'M'}
                      </span>
                    </div>
                    <span className="text-sm text-slate-300 font-medium">
                      {notice.author || '관리자'}
                    </span>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 text-slate-500 border border-dashed border-slate-800 rounded-2xl">
              등록된 게시물이 없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;