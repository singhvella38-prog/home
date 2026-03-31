import React from 'react';
import { MapPin, Phone, Mail, Car, Train, Bus } from 'lucide-react';

const Location = () => {
  // 실제 네이버/카카오 지도에서 '공유 > HTML 태그 복사'를 통해 얻은 URL을 src에 넣으면 됩니다.
  // 아래는 예시용으로 구글 지도를 해당 주소로 맞춘 링크입니다.
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3213.298414441452!2d127.3342345!3d36.3534571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35654944d1872887%3A0x67396a8489849202!2z64yA7KCE6rSR7Jet7IucIOycoOyEseq1rCDsnqXrjIDroZwgMjAtNw!5e0!3m2!1sko!2skr!4v1711867200000!5m2!1sko!2skr";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">오시는 길</h2>
          <p className="mt-4 text-lg text-gray-600">방문하시기 전 위치와 교통편을 확인해 주세요.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 상세 정보 */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600 mt-1" size={24} />
                <div>
                  <h3 className="font-bold text-gray-900">주소</h3>
                  <p className="text-gray-600 mt-1">대전광역시 유성구 장대로 20-7<br />1층</p>
                </div>
              </div>
            </div>
            {/* ... 나머지 연락처/이메일 섹션 (기존과 동일) ... */}
          </div>

          {/* 오른쪽: 지도 영역 (iframe 적용) */}
          <div className="lg:col-span-2">
            <div className="w-full h-80 lg:h-full bg-gray-200 rounded-2xl overflow-hidden shadow-md relative">
              <iframe
                title="Store Location"
                src={mapUrl}
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* 하단 교통안내 (기존과 동일) */}
        {/* ... (생략) ... */}
      </div>
    </div>
  );
};

export default Location;