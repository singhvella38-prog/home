import React from 'react';

const Intro = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      {/* 메인 콘텐츠 영역 */}
      <div className="text-center">
        {/* 애니메이션이 적용된 제목 */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in-down">
          환영합니다! <br />
          <span className="text-blue-500">나만의 멋진 웹사이트</span>입니다.
        </h1>

        {/* 설명 문구 */}
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Vite와 Tailwind CSS를 활용하여 빠르고 아름다운 인터페이스를 구축하고 있습니다. 
          이곳에서 저의 프로젝트와 다양한 기술 스택을 확인해 보세요.
        </p>

        {/* 버튼 그룹 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 shadow-lg transform hover:-translate-y-1">
            시작하기
          </button>
          <button className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg border border-gray-700 transition duration-300 transform hover:-translate-y-1">
            더 알아보기
          </button>
        </div>
      </div>

      {/* 하단 장식용 요소 (선택 사항) */}
      <div className="absolute bottom-10 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default Intro;