import { GET } from '@/app/api/notice/detail';
import { NoticeDetail } from '@/model/notice';

import BackLink from '@/components/detail/BackLink';
import Footer from '@/components/detail/Footer';
import Main from '@/components/detail/Main';

export default async function NoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: NoticeDetail = await GET(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 뒤로가기 버튼 */}
        <BackLink href="/notices" title="공지사항 목록으로 돌아가기" />

        <Main
          HeaderTitle="공지사항"
          HeaderUrl={data.url}
          title={data.title}
          date={data.date}
          contents={data.contents}
        />

        {/* 하단 액션 버튼들 */}
        <Footer backHref="/notices" href={data.url} />
      </div>
    </div>
  );
}
