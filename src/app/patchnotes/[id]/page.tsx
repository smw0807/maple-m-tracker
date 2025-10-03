import { GET } from '@/app/api/patchnote/detail';
import { PatchNoteDetail } from '@/model/patchnote';

import BackLink from '@/components/detail/BackLink';
import Main from '@/components/detail/Main';
import Footer from '@/components/detail/Footer';

export default async function PatchNotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: PatchNoteDetail = await GET(id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BackLink href="/patchnotes" title="패치노트 목록으로 돌아가기" />

        <Main
          HeaderTitle="패치노트"
          HeaderUrl={data.url}
          title={data.title}
          date={data.date}
          contents={data.contents}
        />

        <Footer backHref="/patchnotes" href={data.url} />
      </div>
    </div>
  );
}
