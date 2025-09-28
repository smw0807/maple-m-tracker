import Navigation from '@/components/Navigation';
import { getCharacterInfo } from '@/lib/api';
import { notFound } from 'next/navigation';

interface CharacterPageProps {
  params: {
    name: string;
  };
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const characterName = decodeURIComponent(params.name);

  let characterInfo;
  try {
    characterInfo = await getCharacterInfo(characterName);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              👤 캐릭터 정보
            </h1>
            <p className="text-gray-600">
              {characterName}의 상세 정보를 확인하세요
            </p>
          </div>

          {/* 캐릭터 기본 정보 */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-4xl text-white font-bold">
                  {characterInfo.characterName.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {characterInfo.characterName}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center space-x-1">
                    <span className="text-lg">⚔️</span>
                    <span>{characterInfo.job}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="text-lg">📊</span>
                    <span>Lv.{characterInfo.level}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span className="text-lg">🌍</span>
                    <span>{characterInfo.server}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    기본 정보
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">캐릭터명:</span>
                      <span className="font-medium">
                        {characterInfo.characterName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">레벨:</span>
                      <span className="font-medium">{characterInfo.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">직업:</span>
                      <span className="font-medium">{characterInfo.job}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">서버:</span>
                      <span className="font-medium">
                        {characterInfo.server}
                      </span>
                    </div>
                  </div>
                </div>

                {characterInfo.guildName && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      길드 정보
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">길드명:</span>
                        <span className="font-medium">
                          {characterInfo.guildName}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    활동 정보
                  </h3>
                  <div className="space-y-2 text-sm">
                    {characterInfo.lastLogin && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">마지막 접속:</span>
                        <span className="font-medium">
                          {new Date(characterInfo.lastLogin).toLocaleDateString(
                            'ko-KR'
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    레벨 진행률
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">현재 레벨</span>
                      <span className="font-medium">{characterInfo.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                        style={{ width: `${(characterInfo.level % 10) * 10}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      다음 레벨까지 {10 - (characterInfo.level % 10)}레벨
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              📊 상세 스탯 보기
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              🛡️ 장비 정보 보기
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              🏆 업적 보기
            </button>
          </div>

          {/* 추가 정보 섹션 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-3">⚔️</div>
              <h3 className="font-semibold text-gray-800 mb-2">전투력</h3>
              <p className="text-2xl font-bold text-blue-600">1,234,567</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="font-semibold text-gray-800 mb-2">메소</h3>
              <p className="text-2xl font-bold text-green-600">999,999,999</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-semibold text-gray-800 mb-2">명성</h3>
              <p className="text-2xl font-bold text-purple-600">12,345</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
