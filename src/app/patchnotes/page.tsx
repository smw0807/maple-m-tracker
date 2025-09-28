import Navigation from '@/components/Navigation';
import { getPatchNotes } from '@/lib/api';

export default async function PatchNotesPage() {
  const patchNotes = await getPatchNotes();

  return (
    <div className="min-h-screen">
      <Navigation />

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
            {patchNotes.map((patch) => (
              <div
                key={patch.id}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-bold">
                      {patch.version}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {patch.title}
                      </h3>
                      <p className="text-gray-500">
                        {new Date(patch.date).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {patch.content}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">
                    주요 변경사항
                  </h4>
                  <ul className="space-y-2">
                    {patch.changes.map((change, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{change}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {patchNotes.length === 0 && (
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
