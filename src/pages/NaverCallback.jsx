import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NaverCallback = ({ setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRealProfile = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      const state = params.get("state");

      if (code) {
        try {
          // 우리가 만든 서버 API에 코드와 상태를 전달합니다.
          const response = await fetch(`/api/auth?code=${code}&state=${state}`);
          const realUser = await response.json();

          if (realUser.id) {
            // 진짜 유저 데이터 정제 (네이버 응답 기반)
            const userData = {
              name: realUser.nickname || realUser.name || "사용자",
              profile_image: realUser.profile_image || "https://ssl.pstatic.net/static/pwe/address/img_profile.png",
              email: realUser.email
            };

            // 브라우저 저장 및 상태 업데이트
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            
            alert(`${userData.name}님, 환영합니다!`);
            navigate("/");
          }
        } catch (error) {
          console.error("프로필 가져오기 실패:", error);
          navigate("/Login");
        }
      }
    };

    fetchRealProfile();
  }, [navigate, setUser]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#03C755] mb-4"></div>
      <p className="text-lg font-medium text-gray-400">네이버에서 정보를 안전하게 가져오는 중...</p>
    </div>
  );
};

export default NaverCallback;