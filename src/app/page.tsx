import CharacterSearch from '@/components/CharacterSearch';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-500 mb-6">
            메이플스토리M
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              트래커
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            캐릭터와 길드 정보를 실시간으로 조회하고, 최신 공지사항과 이벤트
            정보를 한눈에 확인하세요
          </p>
        </div>

        {/* 캐릭터 검색 섹션 */}
        <div className="mb-20">
          <CharacterSearch />
        </div>

        {/* 기능 소개 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👤</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                캐릭터 조회
              </h3>
              <p className="text-gray-600">
                캐릭터명으로 레벨, 직업, 길드 등 상세 정보를 실시간으로 조회할
                수 있습니다.
              </p>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                길드 정보
              </h3>
              <p className="text-gray-600">
                길드명으로 길드 레벨, 마스터, 멤버 수 등 길드 관련 정보를 확인할
                수 있습니다.
              </p>
            </div>
          </div> */}

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                최신 정보
              </h3>
              <p className="text-gray-600">
                공지사항, 패치노트, 진행중인 이벤트 등 최신 정보를 빠르게 확인할
                수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
