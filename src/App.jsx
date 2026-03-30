import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import MyPage from './pages/MyPage';
import Login from './pages/Login';
import Intro from './pages/Intro';
import NoticeBoard from './pages/NoticeBoard'; // 공지사항으로 사용
import FreeBoard from './pages/FreeBoard';     // 자유게시판 (새로 생성 필요)
import NoticeDetail from './pages/NoticeDetail'; 
import Write from './pages/Write';
import Archive from './pages/Archive';
import Location from './pages/Location';
import NaverCallback from './pages/NaverCallback';

function App() {
  return (
    <BrowserRouter>
      {/* 테두리 방지를 위해 전체 배경을 어두운 톤으로 맞추거나 
          h-screen 설정을 조정합니다. */}
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
            {/* 게시판 드롭다운 메뉴 */}
            <div className="relative group">
              {/* 클릭 시 공지사항으로 이동 */}
              <Link to="/NoticeBoard" className="hover:text-blue-400 transition flex items-center py-2">
                게시판
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              
              {/* 드롭다운 항목 */}
              <div className="absolute hidden group-hover:block w-32 bg-slate-800 border border-slate-700 rounded shadow-xl top-full left-0 overflow-hidden">
                <Link to="/NoticeBoard" className="block px-4 py-2 hover:bg-blue-600 text-sm">공지사항</Link>
                <Link to="/FreeBoard" className="block px-4 py-2 hover:bg-blue-600 text-sm">자유 게시판</Link>
              </div>
            </div>

            <Link to="/Archive" className="hover:text-blue-400 transition">자료실</Link>
            <Link to="/mypage" className="hover:text-blue-400 transition">마이페이지</Link>
            <Link to="/Login" className="bg-blue-600 px-4 py-1.5 rounded hover:bg-blue-700 transition">로그인</Link>
          </div>
        </nav>

        {/* 컨텐츠 영역: 테두리 제거를 위해 max-w-6xl와 mx-auto를 삭제하거나 
            각 페이지 내부에서 처리하도록 합니다. */}
        <main className="w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Intro" element={<Intro />} />
            <Route path="/NoticeBoard" element={<NoticeBoard />} />
            <Route path="/FreeBoard" element={<FreeBoard />} /> {/* 추가 */}
            <Route path="/Write" element={<Write />} />
            <Route path="/Archive" element={<Archive />} />
            <Route path="/Location" element={<Location />} />
            <Route path="/notice/:id" element={<NoticeDetail />} />
            <Route path="/api/auth/callback/naver" element={<NaverCallback />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;