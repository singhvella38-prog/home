import { useEffect } from 'react';

export default function NaverCallback() {
  useEffect(() => {
    // 주소창에서 ?code=... 부분을 가져옵니다.
    const code = new URL(window.location.href).searchParams.get("code");
    const state = new URL(window.location.href).searchParams.get("state");

    if (code) {
      console.log("네이버에서 받은 코드:", code);
      // 여기서 원래는 서버로 코드를 보내서 '토큰'을 받아야 합니다.
      // 일단은 성공했으니 메인 페이지로 보냅니다.
      alert("로그인 성공! 코드를 확인했습니다.");
      window.location.href = "/"; 
    }
  }, []);

  return <div>로그인 처리 중입니다...</div>;
}