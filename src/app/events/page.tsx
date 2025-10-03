import { GET } from '../api/event/list';
import { EventResponse } from '@/model/event';

import Navigation from '@/components/Navigation';
import ListCard from '@/components/card/ListCard';

export default async function EventsPage() {
  const data: EventResponse = await GET();
  return (
    <div className="min-h-screen">
      <Navigation />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 이벤트</h1>
            <p className="text-gray-600">
              메이플스토리M의 최신 이벤트를 확인하세요
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {data.event_notice.map((event) => (
              <ListCard
                key={event.notice_id}
                icon="🎉"
                title={event.title}
                link={`/events/${event.notice_id}`}
                date={event.date}
              />
            ))}
          </div>

          {data.event_notice.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎪</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                이벤트가 없습니다
              </h3>
              <p className="text-gray-500">
                새로운 이벤트나 공지사항이 등록되면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
