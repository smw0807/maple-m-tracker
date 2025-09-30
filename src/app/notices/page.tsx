import { GET } from '@/app/api/notice/list';
import Navigation from '@/components/Navigation';
import { NoticeResponse } from '@/model/notice';
import ListCard from '@/components/card/ListCard';

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
              <ListCard
                key={notice.notice_id}
                title={notice.title}
                date={notice.date}
                link={`/notices/${notice.notice_id}`}
              />
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
