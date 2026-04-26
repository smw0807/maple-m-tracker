import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 | 메이플스토리M 트래커',
  description: '메이플스토리M 트래커의 이용약관입니다.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              이용약관
            </h1>
            <p className="text-gray-500 text-sm">최종 수정일: 2025년 1월 1일</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제1조 (목적)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 약관은 메이플스토리M 트래커(이하 &quot;서비스&quot;)의
                이용과 관련하여 서비스와 이용자 간의 권리, 의무 및 책임 사항,
                기타 필요한 사항을 규정함을 목적으로 합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제2조 (서비스 정의)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                메이플스토리M 트래커는 넥슨 Open API를 활용하여 메이플스토리M
                게임의 캐릭터 정보, 공지사항, 패치노트, 이벤트 정보를 제공하는
                비공식 팬 사이트입니다. 넥슨코리아(주)와는 공식적인 제휴
                관계가 없습니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제3조 (서비스 이용)
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  본 서비스는 별도의 회원가입 없이 누구나 무료로 이용할 수
                  있습니다.
                </li>
                <li>
                  서비스 이용 시 관련 법령 및 본 약관을 준수해야 합니다.
                </li>
                <li>
                  서비스를 통해 제공되는 정보는 넥슨 Open API 데이터를 기반으로
                  하며, 실시간 정확성을 보장하지 않습니다.
                </li>
                <li>
                  서비스는 예고 없이 내용이 변경되거나 중단될 수 있습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제4조 (금지 행위)
              </h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                이용자는 다음 행위를 해서는 안 됩니다.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>서비스에 대한 자동화된 대량 요청 또는 크롤링</li>
                <li>서비스의 정상적인 운영을 방해하는 행위</li>
                <li>타인의 캐릭터 정보를 악의적인 목적으로 수집하는 행위</li>
                <li>관련 법령을 위반하는 행위</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제5조 (면책 조항)
              </h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>
                  본 서비스는 넥슨 Open API의 데이터 정확성에 대해 책임을 지지
                  않습니다.
                </li>
                <li>
                  서비스 중단, 데이터 오류 등으로 인한 손해에 대해 책임을 지지
                  않습니다.
                </li>
                <li>
                  이용자가 서비스를 통해 얻은 정보를 이용하여 발생한 결과에
                  대해 책임을 지지 않습니다.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제6조 (광고)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 서비스는 운영 비용 충당을 위해 Google AdSense를 통한 광고를
                게재할 수 있습니다. 광고 내용은 Google이 관리하며, 서비스와
                무관합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제7조 (지식재산권)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                메이플스토리M 관련 모든 게임 콘텐츠, 이미지, 텍스트의 저작권은
                넥슨코리아(주)에 있습니다. 본 서비스는 넥슨 Open API 이용
                정책에 따라 해당 데이터를 활용합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                제8조 (약관 변경)
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 약관은 필요에 따라 변경될 수 있으며, 변경 시 본 페이지를
                통해 공지합니다. 변경된 약관은 공지 후 서비스를 계속 이용하는
                경우 동의한 것으로 간주합니다.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                부칙
              </h2>
              <p className="text-gray-700 leading-relaxed">
                본 약관은 2025년 1월 1일부터 시행합니다.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
