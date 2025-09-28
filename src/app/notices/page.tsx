import Navigation from '@/components/Navigation';
import { getNotices } from '@/lib/api';
import { GET } from '@/app/api/notice/list';

export default async function NoticesPage() {
  const notices = await getNotices();
  const list = await GET();

  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📢 공지사항
            </h1>
            <p className="text-gray-600">
              메이플스토리M의 최신 공지사항을 확인하세요
            </p>
          </div>

          <div className="space-y-6">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {notice.type === 'maintenance'
                        ? '🔧'
                        : notice.type === 'event'
                        ? '🎉'
                        : '📢'}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {notice.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(notice.date).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      notice.type === 'maintenance'
                        ? 'bg-orange-100 text-orange-800'
                        : notice.type === 'event'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {notice.type === 'maintenance'
                      ? '점검'
                      : notice.type === 'event'
                      ? '이벤트'
                      : '공지'}
                  </span>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {notice.content}
                </p>

                {notice.url && (
                  <div className="mt-4">
                    <a
                      href={notice.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                    >
                      자세히 보기
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {notices.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                공지사항이 없습니다
              </h3>
              <p className="text-gray-500">
                새로운 공지사항이 올라오면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
