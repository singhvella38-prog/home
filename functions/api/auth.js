export async function onRequest(context) {
  const { request, env } = context; // context에서 env(환경 변수)를 가져옵니다.
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  // 1. 네이버 개발자 센터 정보
  const CLIENT_ID = '5ho47O_84JQdizE9Kcya'; 
  
  // ★ 중요: 대시보드에 설정한 변수명과 일치해야 합니다. (예: NAVER_CLIENT_SECRET)
  const CLIENT_SECRET = env.NAVER_CLIENT_SECRET; 

  if (!CLIENT_SECRET) {
    return new Response(JSON.stringify({ error: "환경 변수가 설정되지 않았습니다." }), { status: 500 });
  }

  try {
    // 2. 접근 토큰(Access Token) 요청
    const tokenUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`;
    
    const tokenResponse = await fetch(tokenUrl);
    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      return new Response(JSON.stringify({ error: "토큰 발급 실패", detail: tokenData }), { status: 400 });
    }

    // 3. 받은 토큰으로 진짜 프로필 정보 요청
    const profileResponse = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: { 
        Authorization: `Bearer ${tokenData.access_token}` 
      },
    });
    const profileData = await profileResponse.json();

    // 4. 리액트(프론트엔드)로 진짜 정보 전달
    // 네이버 응답 구조는 { resultcode: "00", message: "success", response: { ...유저정보 } } 입니다.
    return new Response(JSON.stringify(profileData.response), {
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // 필요한 경우 CORS 허용
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}