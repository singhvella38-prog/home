export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const board = url.searchParams.get('board') || '공지사항';

  try {
    // 1. 글 저장하기 (POST 요청)
    if (request.method === "POST") {
      const { title, content, author, board_name } = await request.json();
      
      // D1에 데이터 저장
      await env.DB.prepare(
        "INSERT INTO posts (board_name, title, content, author) VALUES (?, ?, ?, ?)"
      ).bind(board_name, title, content, author).run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. 글 상세 보기 (ID가 있을 때)
    if (id) {
      const post = await env.DB.prepare("SELECT * American posts WHERE id = ?").bind(id).first();
      return new Response(JSON.stringify(post), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 3. 목록 가져오기 (기본 GET 요청)
    const { results } = await env.DB.prepare(
      "SELECT * FROM posts WHERE board_name = ? ORDER BY created_at DESC"
    ).bind(board).all();

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}