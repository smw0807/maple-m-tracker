import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-4 text-sm text-gray-400">
          <Link href="/about" className="hover:text-white transition-colors">
            서비스 소개
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-white transition-colors">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-white transition-colors">
            이용약관
          </Link>
        </div>
        <p className="text-gray-400">
          © 2026 메이플스토리M 트래커. 모든 권리 보유.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          이 서비스는 메이플스토리M의 비공식 팬 사이트입니다.
        </p>
        <p className="text-gray-600 text-xs mt-2">
          게임 데이터는 넥슨 Open API를 통해 제공됩니다.
        </p>
      </div>
    </footer>
  );
}
