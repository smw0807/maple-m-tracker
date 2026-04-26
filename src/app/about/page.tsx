import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '서비스 소개 | 메이플스토리M 트래커',
  description:
    '메이플스토리M 트래커 서비스 소개 - 캐릭터 조회, 공지사항, 패치노트, 이벤트 정보를 제공하는 비공식 팬 사이트입니다.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              서비스 소개
            </h1>
            <p className="text-gray-600">메이플스토리M 트래커에 대해 알아보세요</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              메이플스토리M 트래커란?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              메이플스토리M 트래커는 넥슨의 모바일 게임{' '}
              <strong>메이플스토리M</strong>을 즐기는 유저들을 위해 만들어진
              비공식 팬 사이트입니다. 캐릭터 정보 조회부터 최신 공지사항,
              패치노트, 진행 중인 이벤트 정보까지 한 곳에서 편리하게 확인할 수
              있도록 제공합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              넥슨 Open API를 활용하여 실시간으로 데이터를 불러오며, 언제
              어디서나 빠르게 게임 정보를 확인하실 수 있습니다.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              주요 기능
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">캐릭터 조회</h3>
                  <p className="text-gray-600 text-sm">
                    서버와 캐릭터명으로 레벨, 직업, 길드, 장비 등 상세 정보를
                    실시간으로 조회할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📢</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">공지사항</h3>
                  <p className="text-gray-600 text-sm">
                    메이플스토리M의 최신 공지사항을 빠르게 확인할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📝</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">패치노트</h3>
                  <p className="text-gray-600 text-sm">
                    게임 업데이트 내역과 밸런스 패치 정보를 확인할 수 있습니다.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎉</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">이벤트</h3>
                  <p className="text-gray-600 text-sm">
                    현재 진행 중인 이벤트 목록과 상세 내용을 한눈에 볼 수
                    있습니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              지원 서버
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                '아케인',
                '크로아',
                '엘리시움',
                '루나',
                '스카니아',
                '유니온',
                '제니스',
              ].map((server) => (
                <span
                  key={server}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {server}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              데이터 출처
            </h2>
            <p className="text-gray-700 leading-relaxed">
              이 서비스에서 제공하는 모든 게임 데이터는{' '}
              <strong>넥슨 Open API</strong>를 통해 제공됩니다. 캐릭터 정보,
              공지사항, 패치노트, 이벤트 데이터는 넥슨의 공식 API를 통해
              실시간으로 불러옵니다.
            </p>
            <p className="text-gray-500 text-sm mt-3">
              ※ 메이플스토리M은 넥슨코리아(주)의 등록 상표입니다. 이 사이트는
              넥슨과 공식적인 제휴 관계가 없는 비공식 팬 사이트입니다.
            </p>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-gray-700 mb-4">
              서비스 이용 중 문의사항이 있으시면 아래 정책을 확인해 주세요.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-blue-600 hover:underline font-medium"
              >
                개인정보처리방침
              </Link>
              <span className="text-gray-400">|</span>
              <Link
                href="/terms"
                className="text-blue-600 hover:underline font-medium"
              >
                이용약관
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
