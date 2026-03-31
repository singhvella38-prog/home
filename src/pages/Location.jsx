import React from 'react';
import { MapPin, Phone, Mail, Car, Train, Bus } from 'lucide-react'; // 아이콘 라이브러리 (선택사항)

const Location = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">오시는 길</h2>
          <p className="mt-4 text-lg text-gray-600">방문하시기 전 위치와 교통편을 확인해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 상세 정보 공간 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">주소</h3>
                  <p className="text-gray-600 mt-1">서울특별시 강남구 테헤란로 123<br />OO빌딩 5층</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <Phone className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-gray-900">연락처</h3>
                  <p className="text-gray-600 mt-1">02-1234-5678</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <Mail className="text-blue-600 mt-1" size={20} />
                <div>
                  <h3 className="font-bold text-gray-900">이메일</h3>
                  <p className="text-gray-600 mt-1">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 지도 영역 */}
          <div className="lg:col-span-2">
            <div className="w-full h-80 lg:h-full bg-gray-200 rounded-2xl overflow-hidden shadow-inner relative">
              {/* 실제 지도를 넣을 때는 iframe이나 SDK를 이곳에 배치하세요 */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                {/* 예시: 구글 맵 iframe 사용 시 */}
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=..." // 실제 임베드 주소로 교체
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        {/* 하단: 교통수단 안내 */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Train className="text-indigo-500 mb-3" size={32} />
            <h4 className="font-bold mb-2">지하철</h4>
            <p className="text-sm text-gray-600 text-center">2호선 역삼역 4번 출구<br />도보 5분 거리</p>
          </div>
          
          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Bus className="text-green-500 mb-3" size={32} />
            <h4 className="font-bold mb-2">버스</h4>
            <p className="text-sm text-gray-600 text-center">간선 147, 463번<br />OO역 정류장 하차</p>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <Car className="text-orange-500 mb-3" size={32} />
            <h4 className="font-bold mb-2">자차</h4>
            <p className="text-sm text-gray-600 text-center">건물 내 지하 주차장 이용<br />(방문객 2시간 무료)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;