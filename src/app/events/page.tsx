import Navigation from '@/components/Navigation';
import { getEvents } from '@/lib/api';

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              🎉 진행중인 이벤트
            </h1>
            <p className="text-gray-600">
              메이플스토리M의 현재 진행중인 이벤트를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const startDate = new Date(event.startDate);
              const endDate = new Date(event.endDate);
              const now = new Date();
              const isActive = now >= startDate && now <= endDate;
              const daysLeft = Math.ceil(
                (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
              );

              return (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {event.imageUrl && (
                    <div className="h-48 bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-6xl">🎁</span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.type === 'event'
                            ? 'bg-purple-100 text-purple-800'
                            : event.type === 'sale'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {event.type === 'event'
                          ? '이벤트'
                          : event.type === 'sale'
                          ? '세일'
                          : '업데이트'}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {isActive ? `D-${daysLeft}` : '종료'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {event.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>
                          시작: {startDate.toLocaleDateString('ko-KR')}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>종료: {endDate.toLocaleDateString('ko-KR')}</span>
                      </div>
                    </div>

                    {isActive && (
                      <div className="mt-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.max(
                                0,
                                Math.min(
                                  100,
                                  ((endDate.getTime() - now.getTime()) /
                                    (endDate.getTime() - startDate.getTime())) *
                                    100
                                )
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {daysLeft > 0 ? `${daysLeft}일 남음` : '오늘 종료'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {events.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎪</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                진행중인 이벤트가 없습니다
              </h3>
              <p className="text-gray-500">
                새로운 이벤트가 시작되면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
