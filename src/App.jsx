import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Intro from './pages/Intro';
import NoticeBoard from './pages/NoticeBoard';
import NaverCallback from './pages/NaverCallback';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        {/* 상단 네비게이션 바 */}
        <nav className="flex items-center justify-between px-8 py-4 bg-slate-900 text-white shadow-md">
          <div className="text-xl font-black tracking-tighter">
            CL <span className="text-blue-400">DESIGN</span>
          </div>
          <div className="flex gap-6 font-medium">
            <Link to="/" className="hover:text-blue-400 transition">홈으로</Link>
            <Link to="/Intro" className="hover:text-blue-400 transition">Intro</Link>
            <Link to="/NoticeBoard" className="hover:text-blue-400 transition">게시판</Link>
            <Link to="/mypage" className="hover:text-blue-400 transition">마이페이지</Link>
            <Link to="/Login" className="hover:text-blue-400 transition">로그인</Link>
          </div>
        </nav>

        {/* 컨텐츠 영역 */}
        <main className="max-w-6xl mx-auto py-10 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Intro" element={<Intro />} />
            <Route path="/NoticeBoard" element={<NoticeBoard />} />
            <Route path="/api/auth/callback/naver" element={<NaverCallback />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;