import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient'; // 1. 여기 경로 대소문자 꼭 확인!

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotices(data || []);
      } catch (error) {
        console.error('Error fetching:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">데이터를 불러오는 중...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 md:p-12 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 border-b border-slate-800 pb-8">
          <h1 className="text-4xl font-extrabold tracking-tight">Project Board</h1>
          <p className="text-slate-400 mt-2 font-medium">공주시 공공디자인 진흥계획 아카이브</p>
        </header>

        <div className="grid gap-8">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <article 
                key={notice.id} 
                className="group bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col md:flex-row"
              >
                {notice.image_url && (
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden">
                    <img 
                      src={notice.image_url} 
                      alt={notice.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                        {notice.title}
                      </h2>
                      <span className="text-xs text-slate-500 font-mono mt-1">
                        {notice.created_at ? new Date(notice.created_at).toLocaleDateString() : ''}
                      </span>
                    </div>

                    <p className="text-slate-400 leading-relaxed line-clamp-3 mb-4">
                      {notice.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {notice.author ? notice.author[0] : '?'}
                      </div>
                      <span className="text-sm text-slate-300">{notice.author || '알 수 없음'}</span>
                    </div>

                    {notice.file_url && (
                      <a 
                        href={notice.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-blue-600 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
                      >
                        DOWNLOAD ZIP
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-slate-500">등록된 게시물이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;