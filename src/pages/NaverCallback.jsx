import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = ({ setUser }) => { // 1. App.jsx에서 보낸 setUser를 받습니다.
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code) {
      console.log("네이버 인증 코드 확인:", code);

      // [임시 처리] 실제 서비스라면 여기서 서버와 통신하여 유저 정보를 가져와야 합니다.
      // 지금은 로그인이 성공했다는 가정하에 가짜 유저 데이터를 만듭니다.
      const mockUser = {
        name: "네이버 사용자",
        profile_image: "https://ssl.pstatic.net/static/pwe/address/img_profile.png", // 네이버 기본 프로필 예시
        email: "user@naver.com"
      };

      // 2. 브라우저 저장소(localStorage)에 유저 정보 저장 (새로고침해도 유지되게)
      localStorage.setItem('user', JSON.stringify(mockUser));

      // 3. App.jsx의 상태 업데이트 (내비게이션 바가 즉시 바뀌게 함)
      setUser(mockUser);

      alert("로그인에 성공하였습니다!");
      
      // 4. 홈으로 이동
      navigate("/"); 
    } else {
      console.error("인증 코드를 찾을 수 없습니다.");
      alert("로그인에 실패하였습니다.");
      navigate("/Login");
    }
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#03C755] mb-4"></div>
      <p className="text-lg font-medium text-gray-400">네이버 로그인 처리 중...</p>
    </div>
  );
};

export default NaverCallback;