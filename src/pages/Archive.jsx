import React, { useState } from 'react';

const Resources = () => {
  // 샘플 데이터 (실제 데이터는 API 등을 통해 가져옵니다)
  const [resources] = useState([
    { id: 1, title: "React 기초 가이드.pdf", category: "Documents", date: "2024-03-20", size: "2.4MB" },
    { id: 2, title: "Tailwind UI Kit v2.zip", category: "Assets", date: "2024-03-18", size: "15.8MB" },
    { id: 3, title: "프로젝트 기획안_최종.docx", category: "Documents", date: "2024-03-15", size: "1.1MB" },
    { id: 4, title: "메인 배너 이미지 소스.psd", category: "Design", date: "2024-03-10", size: "45.2MB" },
    { id: 5, title: "API 연동 규격서.pdf", category: "Documents", date: "2024-03-05", size: "850KB" },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-20 px-4 md:px-8">
      {/* 헤더 섹션 */}
      <div className="max-w-6xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-blue-500">자료실</span>
        </h2>
        <p className="text-gray-400">학습 자료와 프로젝트 관련 파일을 자유롭게 확인하세요.</p>
        
        {/* 검색 및 필터 바 (장식용) */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['전체', 'Documents', 'Assets', 'Design'].map((tab) => (
              <button key={tab} className="px-4 py-2 rounded-full bg-gray-800 hover:bg-blue-600 transition text-sm">
                {tab}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="파일 검색..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 리스트 섹션 */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => (
          <div 
            key={item.id} 
            className="bg-gray-800 border border-gray-700 p-6 rounded-xl hover:border-blue-500 transition-all duration-300 group shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-700 rounded-lg group-hover:bg-blue-600 transition">
                {/* 아이콘: 파일 형태에 따라 변경 가능 */}
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                {item.category}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 truncate">{item.title}</h3>
            
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
              <span>{item.date}</span>
              <span>{item.size}</span>
            </div>

            <button className="w-full py-2.5 bg-gray-700 hover:bg-blue-600 text-white rounded-lg font-medium transition flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              다운로드
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;