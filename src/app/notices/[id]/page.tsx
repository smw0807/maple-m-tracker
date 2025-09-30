import { GET } from '@/app/api/notice/detail';
import { NoticeDetail } from '@/model/notice';
import { processNoticeContent, formatKoreanDate } from '@/lib/html-utils';
import Link from 'next/link';

export default async function NoticePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data: NoticeDetail = await GET(id);

  // HTML 콘텐츠 처리
  const processedContent = processNoticeContent(data.contents);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            <span className="text-lg">←</span>
            <span className="font-medium">공지사항 목록으로 돌아가기</span>
          </Link>
        </div>

        {/* 메인 카드 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <span className="text-white/90 text-sm font-medium">
                  공지사항
                </span>
              </div>
              <Link
                href={data.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                <span className="text-sm">🔗</span>
                <span className="text-sm">원문 보기</span>
              </Link>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              {data.title}
            </h1>

            <div className="flex items-center gap-2 mt-4 text-white/90">
              <span className="text-sm">📅</span>
              <span className="text-sm">{formatKoreanDate(data.date)}</span>
            </div>
          </div>

          {/* 콘텐츠 */}
          <div className="px-8 py-8 bg-black">
            <div
              className="prose prose-lg max-w-none notice-content"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />
          </div>
        </div>

        {/* 하단 액션 버튼들 */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/notices"
            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl border border-gray-200 transition-colors duration-200 font-medium"
          >
            <span>←</span>
            목록으로 돌아가기
          </Link>
          <Link
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
          >
            <span>🔗</span>
            원문에서 보기
          </Link>
        </div>
      </div>
    </div>
  );
}
