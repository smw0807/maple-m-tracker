import { formatKoreanDate, processContent } from '@/lib/html-utils';
import Link from 'next/link';

interface MainProps {
  HeaderTitle: string;
  HeaderUrl: string;
  title: string;
  date: string;
  contents: string;
}

export default function Main({
  HeaderTitle,
  HeaderUrl,
  title,
  date,
  contents,
}: MainProps) {
  const processedContent = processContent(contents);
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span className="text-white/90 text-sm font-medium">
              {HeaderTitle}
            </span>
          </div>
          <Link
            href={HeaderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg transition-colors duration-200"
          >
            <span className="text-sm">🔗</span>
            <span className="text-sm">원문 보기</span>
          </Link>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 mt-4 text-white/90">
          <span className="text-sm">📅</span>
          <span className="text-sm">{formatKoreanDate(date)}</span>
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
  );
}
