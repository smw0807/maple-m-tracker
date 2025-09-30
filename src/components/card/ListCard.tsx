import Link from 'next/link';

interface ListCardProps {
  icon: string;
  title: string;
  date: string;
  link: string;
}
export default function ListCard({ icon, title, date, link }: ListCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-xl">{icon}</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800 leading-tight">
                {title}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(date).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
        <Link
          href={link}
          rel="noopener noreferrer"
          className="ml-4 flex-shrink-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          자세히 보기
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
