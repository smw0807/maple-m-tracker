import { GET } from '@/app/api/patchnote/list';
import { PatchNoteResponse } from '@/model/patchnote';

import ListCard from '@/components/card/ListCard';

export default async function PatchNotesPage() {
  const data: PatchNoteResponse = await GET();

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              📝 패치노트
            </h1>
            <p className="text-gray-600">
              메이플스토리M의 최신 업데이트 내용을 확인하세요
            </p>
          </div>

          <div className="space-y-8">
            {data.patch_notice.map((patch) => (
              <ListCard
                key={patch.notice_id}
                icon="📝"
                title={patch.title}
                date={patch.date}
                link={`/patchnotes/${patch.notice_id}`}
              />
            ))}
          </div>

          {data.patch_notice.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                패치노트가 없습니다
              </h3>
              <p className="text-gray-500">
                새로운 패치노트가 올라오면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
