import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const NoticeBoard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        // 데이터 가져오기
        const { data, error } = await supabase
          .from('notices')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNotices(data || []);
      } catch (error) {
        console.error('Error fetching notices:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">로딩 중...</div>;

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6">
          <h1 className="text-3xl font-bold">Notice Board</h1>
          <p className="text-slate-400">공주시 공공디자인 진흥계획 아카이브</p>
        </header>

        <div className="grid gap-6">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <article key={notice.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col md:flex-row hover:border-blue-500 transition-colors">
                
                {/* 이미지가 있을 때만 렌더링 */}
                {notice.image_url && (
                  <div className="md:w-48 h-48 flex-shrink-0">
                    <img src={notice.image_url} alt="" className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="p-6 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-xl font-semibold">{notice.title}</h2>
                      <span className="text-xs text-slate-500">
                        {new Date(notice.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-400 line-clamp-2 text-sm mb-4">{notice.content}</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-blue-400 font-medium">{notice.author || '관리자'}</span>
                    
                    {notice.file_url && (
                      <a 
                        href={notice.file_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs bg-slate-800 px-3 py-1.5 rounded hover:bg-slate-700 transition"
                      >
                        파일 다운로드
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20 text-slate-500">게시물이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;