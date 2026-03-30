import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const NoticeDetail = () => {
  const { id } = useParams(); // 주소창의 /notice/123 에서 123을 가져옴
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotice = async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .eq('id', id)
        .single(); // 데이터 하나만 가져오기

      if (error) {
        console.error('Error:', error);
        alert('존재하지 않는 게시글입니다.');
        navigate('/NoticeBoard');
      } else {
        setNotice(data);
      }
      setLoading(false);
    };

    fetchNotice();
  }, [id, navigate]);

  if (loading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">로딩 중...</div>;
  if (!notice) return null;

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
              {notice.author}
            </span>
            <span className="font-mono">
              {new Date(notice.created_at).toLocaleString()}
            </span>
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