import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('id, title, content, author, created_at') // 텍스트 컬럼만 명시적으로 선택
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotices(data || []);
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white font-sans">데이터를 불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold tracking-tight">Project Board</h1>
          <p className="text-slate-400 mt-2">공주시 공공디자인 진흥계획 아카이브</p>
        </header>

        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <article 
                key={notice.id} 
                className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-blue-500/50 transition-all shadow-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-slate-100">{notice.title}</h2>
                  <span className="text-xs text-slate-500 font-mono">
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