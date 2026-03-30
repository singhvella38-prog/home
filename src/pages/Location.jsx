export default function Home() {
  return (
    <div className="space-y-12">
      {/* 히어로 섹션: 큰 대문 이미지 느낌 */}
      <section className="relative h-[400px] rounded-3xl overflow-hidden bg-slate-200 flex items-center justify-center border-4 border-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 to-transparent z-10" />
        {/* 나중에 이미지를 넣을 자리입니다 */}
        <div className="relative z-20 text-white px-12 w-full">
          <h2 className="text-5xl font-black mb-4 leading-tight">
            CL<br />
            <span className="text-blue-400">오시는 길 </span>
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            기초조사 분석부터 종합 분석도까지, 우리의 새로운 가치를 디자인합니다.
          </p>
        </div>
      </section>

      {/* 분석 카드 섹션: 그리드 레이아웃 */}
      <section>
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
          완료된 프로젝트
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 카드 1 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4 font-bold">01</div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-blue-600">기초조사 및 분석</h4>
            <p className="text-gray-500 text-sm">현장 조사 데이터와 공주시 특화 자원 분석 내용입니다.</p>
          </div>

          {/* 카드 2 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4 font-bold">02</div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-green-600">SWOT 분석</h4>
            <p className="text-gray-500 text-sm">강점과 약점을 바탕으로 한 전략적 디자인 방향성입니다.</p>
          </div>

          {/* 카드 3 */}
          <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition hover:-translate-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4 font-bold">03</div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-purple-600">종합 분석도 (MAP)</h4>
            <p className="text-gray-500 text-sm">대상지의 문제점과 잠재력을 시각화한 분석 지도입니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
}