import Link from 'next/link';
import { GET } from '@/app/api/notice/list';
import Navigation from '@/components/Navigation';
import { NoticeResponse } from '@/model/notice';

export default async function NoticesPage() {
  const data: NoticeResponse = await GET();
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

          <div className="space-y-4">
            {data.notice.map((notice) => (
              <div
                key={notice.notice_id}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xl">📢</span>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(notice.date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/notices/${notice.notice_id}`}
                    rel="noopener noreferrer"
                    className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
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
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {data.notice.length === 0 && (
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
