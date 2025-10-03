import { GET } from '@/app/api/event/detail';
import { EventDetail } from '@/model/event';
import BackLink from '@/components/detail/BackLink';
import Footer from '@/components/detail/Footer';
import Main from '@/components/detail/Main';

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: EventDetail = await GET(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 뒤로가기 버튼 */}
        <BackLink href="/events" title="이벤트 목록으로 돌아가기" />

        {/* 메인 카드 */}
        <Main
          HeaderTitle="이벤트"
          HeaderUrl={data.url}
          title={data.title}
          date={data.date}
          contents={data.contents}
        />

        {/* 하단 액션 버튼들 */}
        <Footer backHref="/events" href={data.url} />
      </div>
    </div>
  );
}
