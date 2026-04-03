import React from 'react';

export default function SocialLoginPage() {
  
  // 네이버 로그인 핸들러 함수
  const handleNaverLogin = () => {
    // 1. 네이버 개발자 센터에서 발급받은 Client ID (유지)
    const CLIENT_ID = '5ho47O_84JQdizE9Kcya'; 
    
    // 2. Cloudflare 도메인에 맞춘 새로운 Callback URL
    // Vercel 주소 대신 현재 사용 중인 home-e4f.pages.dev 주소를 입력합니다.
    const REDIRECT_URI = encodeURIComponent('https://home-e4f.pages.dev/api/auth/callback/naver');
    
    // 3. 상태 값 (보안용 랜덤 문자열)
    const STATE = encodeURIComponent(Math.random().toString(36).substring(2));
    
    // 4. 최종 요청 URL 구성
    const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
    
    // 5. 네이버 로그인 페이지로 이동
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <div className="min-h-screen bg-[#f5f6f7] flex flex-col items-center justify-center p-4">
      <h1 className="text-[#000080] text-5xl font-bold mb-10 tracking-tight">
        CL Design
      </h1>

      <div className="w-full max-w-[460px] bg-white border border-gray-300 rounded-lg shadow-sm p-8">
        <p className="text-center text-gray-600 mb-8 font-medium">
          서비스 이용을 위해 로그인이 필요합니다.<br />
          소셜 로그인만 가능합니다
        </p>

        <div className="space-y-3">
          {/* 네이버 버튼에 onClick 연결 */}
          <button 
            onClick={handleNaverLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#03C755] text-white py-3.5 rounded-md font-bold text-[16px] hover:opacity-90 transition-opacity"
          >
            <span className="w-5 text-center font-extrabold text-lg">N</span> 네이버로 로그인
          </button>

          {/* 카카오 */}
          <button className="w-full flex items-center justify-center gap-3 bg-[#FEE500] text-[#191919] py-3.5 rounded-md font-bold text-[16px] hover:opacity-90 transition-opacity">
            <span className="w-5 text-center font-extrabold text-lg">K</span> 카카오로 로그인
          </button>

          {/* 구글 */}
          <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-3.5 rounded-md font-bold text-[16px] border border-gray-300 hover:bg-gray-50 transition-colors">
            <span className="w-5 text-center font-extrabold text-lg">G</span> Google로 로그인
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-4 text-sm text-gray-400">
          <button className="hover:underline">로그인 문의</button>
          <span>|</span>
          <button className="hover:underline">개인정보 처리방침</button>
        </div>
      </div>
      
      <p className="mt-8 text-xs text-gray-400 uppercase text-center">
        © CL DESIGN Corp. All Rights Reserved.
      </p>
    </div>
  );
}