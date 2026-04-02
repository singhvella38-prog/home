const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. 카테고리 이름을 DB와 똑같이 맞춥니다.
      const dbBoardName = boardCategory === 'notice' ? '공지사항' : '자유게시판';

      // 2. 서버로 데이터를 보냅니다.
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: title, 
          content: content, 
          author: author, 
          board_name: dbBoardName // ★ 이 이름이 posts.js의 변수명과 일치해야 합니다!
        }),
      });

      if (!response.ok) {
        // 서버에서 에러가 난 경우 상세 내용을 출력해봅니다.
        const errorData = await response.json();
        throw new Error(errorData.error || '글 등록 실패');
      }

      alert('글이 성공적으로 등록되었습니다.');
      
      // 작성 후 해당 게시판으로 이동
      if (boardCategory === 'notice') {
        navigate('/NoticeBoard');
      } else {
        navigate('/FreeBoard');
      }
    } catch (error) {
      alert('오류 발생: ' + error.message);
    } finally {
      setLoading(false);
    }
  };