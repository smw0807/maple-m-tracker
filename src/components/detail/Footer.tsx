import Link from 'next/link';

interface FooterProps {
  backHref: string;
  href: string;
}
export default function Footer({ backHref, href }: FooterProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        href={backHref}
        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl border border-gray-200 transition-colors duration-200 font-medium"
      >
        <span>←</span>
        목록으로 돌아가기
      </Link>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 font-medium"
      >
        <span>🔗</span>
        원문에서 보기
      </Link>
    </div>
  );
}
