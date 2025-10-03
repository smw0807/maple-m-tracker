import Link from 'next/link';

interface HeaderProps {
  href: string;
  title: string;
}
export default function Header({ href, title }: HeaderProps) {
  return (
    <div className="mb-6">
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
      >
        <span className="text-lg">←</span>
        <span className="font-medium">{title}</span>
      </Link>
    </div>
  );
}
