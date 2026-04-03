import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Board = () => {
  // 1. URL의 :type 파라미터 (notice 또는 free)를 가져옵니다.
  const { type } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. 게시판 타입별 설정 (제목, DB조회용 이름, 강조 색상 등)
  const boardConfig = {
    notice: {
      title: "Notice Board",
      description: "공지사항 (D1 Database)",
      dbName: "공지사항",
      accentColor: "text-blue-400",
      btnColor: "bg-blue-600 hover:bg-blue-500",
      iconColor: "bg-blue-500/20 text-blue-400"
    },
    free: {
      title: "Free Board",
      description: "자유게시판 (D1 Database)",
      dbName: "자유게시판",
      accentColor: "text-green-400",
      btnColor: "bg-green-600 hover:bg-green-500",
      iconColor: "bg-green-500/20 text-green-400"
    }
  };

  // 현재 접속한 타입이 없으면 기본값으로 notice 사용
  const current = boardConfig[type] || boardConfig.notice;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 3. 현재 게시판의 dbName('공지사항' 등)을 파라미터로 전달
        const response = await fetch('/api/posts?board=' + encodeURIComponent(current.dbName));
        
        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const data = await response.json();
        setPosts(data || []);
      } catch (error) {
        console.error('Fetch error:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [type, current.dbName]); // 게시판 타입이 바뀔 때마다 다시 실행

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
            <h1 className="text-3xl font-bold tracking-tight">{current.title}</h1>
            <p className="text-slate-400 mt-2">{current.description}</p>
          </div>
          
          <Link 
            to="/write" 
            // 4. 글쓰기 페이지로 현재 게시판의 한글 이름을 넘겨줌
            state={{ category: current.dbName }} 
            className={`${current.btnColor} text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg`}
          >
            글쓰기
          </Link>
        </header>

        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/notice/${post.id}`} key={post.id} className="block group">
                <article 
                  className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl group-hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h2 className={`text-xl font-bold text-slate-100 group-hover:${current.accentColor} transition-colors`}>
                      {post.title}
                    </h2>
                    <span className="text-xs text-slate-500 font-mono">
                      {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-sm mb-4 line-clamp-3">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800/50">
                    <div className={`w-5 h-5 ${current.iconColor} rounded-full flex items-center justify-center`}>
                      <span className="text-[10px] font-bold">
                        {post.author ? post.author[0] : 'U'}
                      </span>
                    </div>
                    <span className="text-sm text-slate-300 font-medium">
                      {post.author || '관리자'}
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

export default Board;