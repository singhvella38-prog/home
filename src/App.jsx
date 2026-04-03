import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Intro from './pages/Intro';
import Board from './pages/Board'; // 통합 게시판 컴포넌트 임포트
import NoticeDetail from './pages/NoticeDetail'; 
import Write from './pages/Write';
import Archive from './pages/Archive';
import Location from './pages/Location';
import NaverCallback from './pages/NaverCallback';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('로그아웃 되었습니다.');
    window.location.href = '/';
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        
        {/* 상단 네비게이션 바 */}
        <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 text-white shadow-md sticky top-0 z-50">
          <div className="text-xl font-black tracking-tighter">
            <Link to="/" className="hover:text-blue-400 transition">CL <span className="text-blue-400">DESIGN</span></Link>
          </div>
          
          <div className="flex gap-6 font-medium items-center">
            <Link to="/" className="hover:text-blue-400 transition">홈으로</Link>
            <Link to="/Intro" className="hover:text-blue-400 transition">Intro</Link>
            <Link to="/Location" className="hover:text-blue-400 transition">오시는 길</Link>
            
            {/* 게시판 드롭다운: 주소를 /board/notice 와 /board/free 로 변경 */}
            <div className="relative group">
              <Link to="/board/notice" className="hover:text-blue-400 transition flex items-center py-2">
                게시판
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute hidden group-hover:block w-32 bg-slate-800 border border-slate-700 rounded shadow-xl top-full left-0 overflow-hidden">
                <Link to="/board/notice" className="block px-4 py-2 hover:bg-blue-600 text-sm">공지사항</Link>
                <Link to="/board/free" className="block px-4 py-2 hover:bg-blue-600 text-sm">자유 게시판</Link>
              </div>
            </div>

            <Link to="/Archive" className="hover:text-blue-400 transition">자료실</Link>
            
            {user ? (
              <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
                <Link 
                  to="/mypage" 
                  className="flex items-center gap-2 group transition-all hover:opacity-80"
                >
                  {user.profile_image && (
                    <img 
                      src={user.profile_image} 
                      alt="profile" 
                      className="w-9 h-9 rounded-full border-2 border-blue-500 group-hover:border-white transition-colors object-cover" 
                    />
                  )}
                  <span className="text-sm font-bold text-blue-400 group-hover:text-white transition-colors">
                    {user.name}님
                  </span>
                </Link>

                <button 
                  onClick={handleLogout}
                  className="bg-slate-800 border border-slate-700 px-3 py-1.5 rounded text-xs text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all ml-2"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <Link to="/Login" className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition">로그인</Link>
            )}
          </div>
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Intro" element={<Intro />} />
            
            {/* ★ 통합 게시판 라우트: :type 파라미터 사용 */}
            <Route path="/board/:type" element={<Board />} />
            
            <Route path="/Write" element={<Write />} />
            <Route path="/Archive" element={<Archive />} />
            <Route path="/Location" element={<Location />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/api/auth/callback/naver" element={<NaverCallback setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;