export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  // 한글 파라미터(자유게시판 등)를 안전하게 읽기 위해 디코딩 추가
  const boardParam = url.searchParams.get('board');
  const board = boardParam ? decodeURIComponent(boardParam) : '공지사항';

  try {
    // 1. 글 저장하기 (POST 요청)
    if (request.method === "POST") {
      const { title, content, author, board_name } = await request.json();
      
      await env.DB.prepare(
        "INSERT INTO posts (board_name, title, content, author) VALUES (?, ?, ?, ?)"
      ).bind(board_name, title, content, author).run();

      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. 글 상세 보기 (ID가 있을 때)
    if (id) {
      // ★ American -> FROM 으로 수정 완료!
      const post = await env.DB.prepare("SELECT * FROM posts WHERE id = ?").bind(id).first();
      
      if (!post) {
        return new Response(JSON.stringify({ error: "게시글을 찾을 수 없습니다." }), { status: 404 });
      }

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