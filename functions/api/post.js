// functions/api/posts.js

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname; // 호출된 주소 (예: /api/posts/notice)
  const id = url.searchParams.get('id');

  try {
    // 1. 글 상세 보기 (GET /api/posts?id=숫자)
    if (id) {
      const post = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
      return new Response(JSON.stringify(post), { headers: { "Content-Type": "application/json" } });
    }

    // 2. 글 저장하기 (POST /api/posts)
    if (request.method === "POST") {
      const { title, content, author, board_name } = await request.json();
      await env.DB.prepare(
        "INSERT INTO posts (title, content, author, board_name) VALUES (?, ?, ?, ?)"
      ).bind(title, content, author, board_name).run();
      return new Response(JSON.stringify({ success: true }));
    }

    // 3. 목록 가져오기 (기본 GET /api/posts)
    // 쿼리 스트링으로 게시판 구분 가능 (예: /api/posts?board=공지사항)
    const board = url.searchParams.get('board') || '공지사항';
    const { results } = await env.DB.prepare(
      "SELECT * FROM posts WHERE board_name = ? ORDER BY created_at DESC"
    ).bind(board).all();

    return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });

  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}