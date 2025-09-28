import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '메이플스토리M 트래커',
  description:
    '메이플스토리M 캐릭터, 길드 조회 및 공지사항, 패치노트, 진행중 이벤트 정보 제공',
  keywords: [
    '메이플스토리M',
    '캐릭터 조회',
    '길드 조회',
    '공지사항',
    '패치노트',
    '이벤트',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
