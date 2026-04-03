import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'; // 추가
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Intro from './pages/Intro';
import NoticeBoard from './pages/NoticeBoard';
import FreeBoard from './pages/FreeBoard';
import NoticeDetail from './pages/NoticeDetail'; 
import Write from './pages/Write';
import Archive from './pages/Archive';
import Location from './pages/Location';
import NaverCallback from './pages/NaverCallback';

function App() {
  // 1. 유저 정보를 담을 상태 (초기값은 localStorage에서 가져옴)
  const [user, setUser] = useState(null);

  // 2. 브라우저가 켜질 때나 새로고침할 때 로그인 정보를 확인
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // 3. 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('user'); // 저장된 정보 삭제
    setUser(null); // 상태 초기화
    alert('로그아웃 되었습니다.');
    window.location.href = '/'; // 홈으로 이동
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
            
            <div className="relative group">
              <Link to="/NoticeBoard" className="hover:text-blue-400 transition flex items-center py-2">
                게시판
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute hidden group-hover:block w-32 bg-slate-800 border border-slate-700 rounded shadow-xl top-full left-0 overflow-hidden">
                <Link to="/NoticeBoard" className="block px-4 py-2 hover:bg-blue-600 text-sm">공지사항</Link>
                <Link to="/FreeBoard" className="block px-4 py-2 hover:bg-blue-600 text-sm">자유 게시판</Link>
              </div>
            </div>

            <Link to="/Archive" className="hover:text-blue-400 transition">자료실</Link>
            
            {/* 4. 로그인 상태에 따른 조건부 렌더링 */}
            {user ? (
              // 로그인 된 상태
              <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
                <div className="flex items-center gap-2">
                  {user.profile_image && (
                    <img src={user.profile_image} alt="profile" className="w-8 h-8 rounded-full border border-blue-500" />
                  )}
                  <span className="text-sm font-bold text-blue-400">{user.name}님</span>
                </div>
                <Link to="/mypage" className="text-sm hover:text-white text-slate-400 transition">마이페이지</Link>
                <button 
                  onClick={handleLogout}
                  className="bg-slate-700 px-3 py-1.5 rounded text-xs hover:bg-red-600 transition"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              // 로그인 안 된 상태
              <>
                <Link to="/mypage" className="hover:text-blue-400 transition">마이페이지</Link>
                <Link to="/Login" className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition">로그인</Link>
              </>
            )}
          </div>
        </nav>

        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Intro" element={<Intro />} />
            <Route path="/NoticeBoard" element={<NoticeBoard />} />
            <Route path="/FreeBoard" element={<FreeBoard />} />
            <Route path="/Write" element={<Write />} />
            <Route path="/Archive" element={<Archive />} />
            <Route path="/Location" element={<Location />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            {/* Callback 페이지에 setUser 전달 */}
            <Route path="/api/auth/callback/naver" element={<NaverCallback setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;