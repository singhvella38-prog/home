import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. URL 주소창에서 네이버가 던져준 code와 state 값을 가져옵니다.
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code) {
      // 2. 코드가 확인되면 일단 성공 메시지를 띄우고 홈으로 보냅니다.
      // (실제 서비스에서는 여기서 백엔드 서버와 통신하여 토큰을 받아야 합니다.)
      console.log("네이버 인증 코드:", code);
      alert("네이버 로그인을 시도 중입니다. 인증 코드를 확인했습니다.");
      
      // 일단 홈("/")이나 마이페이지("/mypage")로 이동시킵니다.
      navigate("/"); 
    } else {
      // 코드가 없다면 에러이므로 로그인 페이지로 돌려보냅니다.
      console.error("인증 코드를 찾을 수 없습니다.");
      navigate("/Login");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#03C755] mb-4"></div>
      <p className="text-lg font-medium text-gray-600">네이버 로그인 처리 중...</p>
    </div>
  );
};

export default NaverCallback;