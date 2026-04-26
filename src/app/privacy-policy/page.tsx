import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 | 메이플스토리M 트래커',
  description: '메이플스토리M 트래커의 개인정보처리방침입니다.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              개인정보처리방침
            </h1>
            <p className="text-gray-500 text-sm">최종 수정일: 2025년 1월 1일</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 prose prose-gray max-w-none">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                1. 개인정보처리방침 개요
              </h2>
              <p className="text-gray-700 leading-relaxed">
                메이플스토리M 트래커(이하 &quot;서비스&quot;)는 이용자의
                개인정보를 중요시하며, 「개인정보 보호법」 및 관련 법령을
                준수합니다. 본 방침은 서비스가 수집하는 정보의 종류, 이용
                목적, 보호 방법 등을 안내합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                2. 수집하는 정보
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                본 서비스는 별도의 회원가입이나 로그인 없이 이용할 수 있으며,
                다음과 같은 정보가 자동으로 수집될 수 있습니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  <strong>방문 기록:</strong> 접속 IP, 방문 일시, 페이지 조회
                  기록 (Vercel Analytics를 통해 수집)
                </li>
                <li>
                  <strong>검색 정보:</strong> 캐릭터 조회 시 입력한 서버명 및
                  캐릭터명 (서버에 저장되지 않음)
                </li>
                <li>
                  <strong>쿠키 및 광고 데이터:</strong> Google AdSense를 통한
                  광고 제공 목적으로 쿠키가 사용될 수 있음
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                3. 개인정보의 이용 목적
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스 제공 및 운영</li>
                <li>서비스 이용 통계 분석 및 품질 개선</li>
                <li>맞춤형 광고 제공 (Google AdSense)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                4. 개인정보의 보유 및 이용 기간
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 서비스는 개인정보를 별도로 저장하지 않습니다. 방문 통계
                데이터는 Vercel Analytics에 의해 관리되며, Vercel의
                개인정보처리방침을 따릅니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                5. 제3자 서비스
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                본 서비스는 다음의 제3자 서비스를 이용합니다.
              </p>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Google AdSense
                  </h3>
                  <p className="text-gray-600 text-sm">
                    광고 제공을 위해 Google AdSense를 사용합니다. Google은
                    쿠키를 사용하여 이용자의 관심사에 맞는 광고를 표시할 수
                    있습니다. Google의 광고 쿠키 사용 방지는{' '}
                    <a
                      href="https://www.google.com/settings/ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Google 광고 설정
                    </a>
                    에서 관리할 수 있습니다.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Vercel Analytics
                  </h3>
                  <p className="text-gray-600 text-sm">
                    서비스 이용 통계 분석을 위해 Vercel Analytics를 사용합니다.
                    수집된 데이터는 서비스 개선 목적으로만 활용됩니다.
                  </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    넥슨 Open API
                  </h3>
                  <p className="text-gray-600 text-sm">
                    게임 데이터 제공을 위해 넥슨 Open API를 사용합니다.
                    캐릭터명 및 서버 정보는 API 호출 시 넥슨 서버로 전송됩니다.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                6. 쿠키 사용
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 서비스는 Google AdSense 광고 제공을 위해 쿠키를 사용합니다.
                브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스
                기능이 제한될 수 있습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                7. 개인정보처리방침 변경
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 방침은 관련 법령 및 서비스 변경 사항에 따라 업데이트될 수
                있습니다. 변경 시 본 페이지를 통해 공지합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                8. 문의
              </h2>
              <p className="text-gray-700 leading-relaxed">
                개인정보 관련 문의사항이 있으시면 GitHub Issues를 통해
                문의해주시기 바랍니다.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
