import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '振碩汽車 - 電子名片',
  description: '特殊裝備與婚宴接駁專員 - 雪具、高爾夫球具等專車運送，與活動包車',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
